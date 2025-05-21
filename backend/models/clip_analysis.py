import sys
import os
import torch
import json
from PIL import Image
import numpy as np

# Make sure this path matches where you store your CLIP model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "ViT-B-32.pt")

def load_model():
    try:
        # Dynamic import
        sys.path.append(os.path.dirname(__file__))
        import open_clip
        
        # Set device
        device = "cuda" if torch.cuda.is_available() else "cpu"
        
        # Load TorchScript CLIP model
        model = torch.jit.load(MODEL_PATH, map_location=device).eval()
        _, _, preprocess = open_clip.create_model_and_transforms(
            model_name="ViT-B-32", 
            pretrained=""  # Local model, empty pretrained
        )
        
        return model, preprocess, device
    except Exception as e:
        print(f"Error loading CLIP model: {str(e)}", file=sys.stderr)
        sys.exit(1)

def analyze_image(image_path):
    try:
        # Concepts for analysis
        concepts = [
            "The image appears low in saturation.",
            "The image has high saturation.",
            "The contrast is low, making the image feel flat.",
            "The contrast is too high, with blown-out areas.",
            "The image has a warm color palette.",
            "The image has a cool color palette.",
            "The background appears cluttered.",
            "The subject is well isolated from the background.",
            "Lighting is harsh with strong shadows.",
            "Soft, diffused lighting is used effectively.",
            "Highlights are blown out.",
            "Shadows are too dark and underexposed.",
            "The image has visible noise or grain.",
            "The image has smooth tones with low noise.",
        ]

        # Suggestions based on concepts
        concept_to_suggestion = {
            "The image appears low in saturation.": "Boost the saturation to make the colors more lively.",
            "The image has high saturation.": "Reduce saturation slightly if it feels overwhelming.",
            "The contrast is low, making the image feel flat.": "Increase the contrast to add depth and dimension.",
            "The contrast is too high, with blown-out areas.": "Tone down highlights and shadows for better balance.",
            "The image has a warm color palette.": "This gives a cozy feel. Ensure it fits the mood of your subject.",
            "The image has a cool color palette.": "Cool tones work well for calm or moody scenes.",
            "The background appears cluttered.": "Blur or simplify the background to highlight the subject.",
            "The subject is well isolated from the background.": "Excellent focus on the subject!",
            "Lighting is harsh with strong shadows.": "Use softer or diffused lighting to soften the look.",
            "Soft, diffused lighting is used effectively.": "Great lighting — keep it up!",
            "Highlights are blown out.": "Reduce exposure or use HDR techniques.",
            "Shadows are too dark and underexposed.": "Raise shadow exposure or use fill light.",
            "The image has visible noise or grain.": "Reduce ISO or apply denoising filters.",
            "The image has smooth tones with low noise.": "Clean and smooth image — well done!",
        }
        
        # Load model and preprocess
        model, preprocess, device = load_model()
        import open_clip  # Required for tokenizing
        
        # Load and process image
        image = Image.open(image_path).convert("RGB")
        image_tensor = preprocess(image).unsqueeze(0).to(device)
        
        # Encode text prompts
        with torch.no_grad():
            text_tokens = open_clip.tokenize(concepts).to(device)
            text_features = model.encode_text(text_tokens)
            text_features /= text_features.norm(dim=-1, keepdim=True)
            
            # Encode image
            image_features = model.encode_image(image_tensor)
            image_features /= image_features.norm(dim=-1, keepdim=True)
            
            # Calculate similarities
            similarity = (100.0 * image_features @ text_features.T).squeeze(0)
            top_indices = similarity.topk(3).indices.cpu().numpy()
            
            # Get top feedbacks and suggestions
            top_feedbacks = [concepts[i] for i in top_indices]
            suggestions = [concept_to_suggestion.get(concepts[i], "") for i in top_indices]
            aggregated_suggestion = " ".join(suggestions)
        
        # Create response
        result = {
            "feedback": top_feedbacks,
            "suggestion": aggregated_suggestion.strip()
        }
        
        # Output as JSON
        print(json.dumps(result))
        
    except Exception as e:
        print(f"Error analyzing image: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python clip_analysis.py <image_path>", file=sys.stderr)
        sys.exit(1)
    
    image_path = sys.argv[1]
    analyze_image(image_path)