# Tensor-Titans

# MindfulConnect-Mental Health Support Platform

A secure and AI-powered platform connecting individuals facing mental health challenges with certified professionals while preventing fake profiles.

Website Hosted successfully at : https://shaun420.github.io/HM0011_TensorTitans/


---

Table of Contents

1. Introduction


2. Features


3. Tech Stack


4. Project Structure


5. Setup Instructions


6. Backend (Flask)


7. Frontend (React)


8. AI/ML Module


9. API Documentation


10. Deployment


11. Contributing


12. License




---

1. Introduction

Mental health is a critical issue that requires a safe, private, and efficient support system. This platform provides:

User Profiles for personalized tracking.

AI-powered Chatbot for preliminary support.

Fake Profile Detection using ML models.

Encrypted Communication for privacy.

Connections with Certified Professionals for expert guidance.



---

2. Features

✔ Secure user authentication (JWT-based)
✔ AI chatbot for mental health support
✔ Fake profile detection using ML
✔ Secure messaging between users and professionals
✔ Personalized user profiles and progress tracking
✔ Sentiment analysis on chat interactions
✔ Scalable and cloud-ready deployment


---

3. Tech Stack

Backend

Flask (Python-based backend framework)

PostgreSQL (Relational database)

SQLAlchemy (ORM for database interactions)

JWT Authentication for security


Frontend

React.js (Component-based UI framework)

Tailwind CSS (Modern styling framework)

Axios (For API calls)


AI/ML

TensorFlow/PyTorch (Deep learning framework)

NLTK & Transformers (For NLP chatbot)

Scikit-learn (Machine learning models)


Deployment

Docker (Containerized app setup)

AWS/GCP (Cloud hosting)

Nginx (Reverse proxy for secure API access)



---

4. Project Structure

mental_health_platform/
│── backend/                    # Flask backend
│   ├── app/                    
│   │   ├── routes/             
│   │   │   ├── auth_routes.py   
│   │   │   ├── user_routes.py   
│   │   │   ├── chat_routes.py   
│   │   │   ├── ai_routes.py    
│   │   ├── models/             
│   │   ├── services/           
│   │   ├── utils/              
│   │   ├── main.py             
│   ├── requirements.txt        
│
│── frontend/                   
│   ├── src/                    
│   │   ├── components/         
│   │   ├── pages/              
│   │   ├── services/           
│   │   ├── App.js              
│   ├── package.json            
│
│── ai_ml/                      
│   ├── data/                    
│   ├── models/                  
│   ├── notebooks/               
│   ├── src/                     
│   ├── api/                     
│   ├── tests/                   
│   ├── requirements.txt         
│
│── deployment/                  
│   ├── Dockerfile               
│   ├── docker-compose.yml       
│   ├── nginx.conf               
│
│── README.md


---

5. Setup Instructions

Prerequisites

Python 3.9+

Node.js 16+

PostgreSQL

Docker (for deployment)


⿡ Clone the Repository

git clone https://github.com/your-repo/mental_health_platform.git
cd mental_health_platform

⿢ Backend Setup

cd backend
python -m venv venv
source venv/bin/activate  # (Windows: venv\Scripts\activate)
pip install -r requirements.txt
python main.py

> API runs at http://localhost:5000



⿣ Frontend Setup

cd frontend
npm install
npm run dev

> Frontend runs at http://localhost:3000



⿤ AI/ML Setup

cd ai_ml
pip install -r requirements.txt
python chatbot_api.py

> AI models API runs at http://localhost:5001




---

6. Backend (Flask)

routes/auth_routes.py → Login, signup, JWT authentication.

routes/user_routes.py → Profile management, progress tracking.

routes/chat_routes.py → Secure chat between users & professionals.

routes/ai_routes.py → AI chatbot and fake profile detection API.



---

7. Frontend (React)

pages/Login.js → User authentication page.

pages/Dashboard.js → User profile and progress tracking.

pages/Chat.js → Secure chat interface.

services/authService.js → Handles login/signup API requests.

services/chatService.js → Handles chat API interactions.



---

8. AI/ML Module

Chatbot

Model: Transformer-based NLP model (GPT-4 or custom)

Libraries: NLTK, HuggingFace Transformers

Endpoint: POST /api/chatbot


Fake Profile Detection

Model: Classification ML model (Random Forest, XGBoost)

Dataset: User behavior patterns

Endpoint: POST /api/detect_fake_profile


Sentiment Analysis

Model: BERT-based sentiment classifier

Endpoint: POST /api/sentiment_analysis



---

9. API Documentation

Auth Routes

Chatbot API

Fake Profile Detection API


---

10. Deployment

Docker

docker-compose up --build

AWS/GCP Deployment

1. Set up an EC2 instance.


2. Install Docker & Docker Compose.


3. Run the project using:

docker-compose up -d




---

11. Contributing

We welcome contributions! Follow these steps:

1. Fork the repo


2. Create a feature branch


3. Commit changes & open a pull request




---

12. License

MIT License. Feel free to use and modify.


---

Next Steps

1. Push this README & project structure to GitHub.


2. Start Flask API development.


3. Begin AI chatbot & fake profile detection.


4. Connect frontend with backend APIs.
