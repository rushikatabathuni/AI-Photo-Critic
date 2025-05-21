# 🎨 AI Art Critic & Feedback System

This is a full-stack web application that allows users to upload artwork, receive AI-generated aesthetic analysis and feedback, and optionally edit the image using controls like brightness, contrast, and saturation.

## ✨ Features

- Upload any artwork (JPG/PNG)
- AI analyzes and gives:
  - Aesthetic score (1–10)
  - Detailed textual feedback
  - Improvement suggestions
- Image editing options: brightness, contrast, saturation
- Built using **ReactJS (Vite + Tailwind)** for frontend and **FastAPI** for backend
- Aesthetic and feedback models based on `aesthetic-predictor-v2-5` and `CLIP`


## 🚀 Getting Started

### 🔧 Backend Setup (FastAPI)

1. Create virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install fastapi uvicorn pillow torch torchvision transformers
```

4. Run the server:
```bash
uvicorn main:app --reload
```

API should be live at `http://localhost:xxxx`

### 💻 Frontend Setup (React)

1. Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:xxxx`


## 🛠️ Technologies Used

- Frontend: ReactJS, Vite, TailwindCSS
- Backend: FastAPI, PyTorch
- Models: aesthetic-predictor-v2-5, OpenAI CLIP

## 📸 Sample

![upload-demo](https://your-image-link.com/upload.jpg)
> *Upload page with image preview and feedback.*

Inspired by open-source work in AI aesthetics and image understanding.



