import sys
import os
import torch
from PIL import Image
from pathlib import Path
import json

# Make sure this path matches where you store your model file
MODEL_PATH = os.path.join(os.path.dirname(__file__), "aesthetic_predictor_v2_5.pth")

def load_model():
    try:
        # Dynamically import the model module - adjust this if your module name is different
        sys.path.append(os.path.dirname(__file__))
        from siglip_v2_5 import convert_v2_5_from_siglip
        
        # Set torch home to the model directory
        os.environ["TORCH_HOME"] = str(Path(os.path.dirname(__file__)))
        
        # Load model and preprocessor
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        model, preprocessor = convert_v2_5_from_siglip(
            low_cpu_mem_usage=True,
            trust_remote_code=True,
        )
        
        # Move model to appropriate device and set precision
        if device.type == "cuda":
            model = model.to(torch.bfloat16).cuda()
        else:
            model = model.to(device)
            
        return model, preprocessor, device
    except Exception as e:
        print(f"Error loading model: {str(e)}", file=sys.stderr)
        sys.exit(1)

def predict_score(image_path):
    try:
        # Load model
        model, preprocessor, device = load_model()
        
        # Load and preprocess image
        image = Image.open(image_path).convert("RGB")
        
        # Create inputs based on device
        if device.type == "cuda":
            pixel_values = preprocessor(images=image, return_tensors="pt").pixel_values.to(torch.bfloat16).cuda()
        else:
            pixel_values = preprocessor(images=image, return_tensors="pt").pixel_values.to(device)
        
        # Predict
        with torch.inference_mode():
            score = model(pixel_values).logits.squeeze().float().cpu().numpy()
        
        # Print score to stdout (will be captured by Node.js)
        print(f"{score}")
        
    except Exception as e:
        print(f"Error predicting score: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python aesthetic_score.py <image_path>", file=sys.stderr)
        sys.exit(1)
    
    image_path = sys.argv[1]
    predict_score(image_path)