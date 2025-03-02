from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from app.config import Config
from app.models.user import db, User
from app.models.chatbot import Message

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

    # JWT Authentication
    JWTManager(app)

    # Connect and Create Tables
    db.connect()
    db.create_tables([User], safe=True)
    db.create_tables([Message], safe=True)

    # Register Blueprints
    from app.routes.auth_routes import auth_bp
    from app.routes.user_routes import user_bp
    from app.routes.chatbot_routes import chat_bp

    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(user_bp, url_prefix="/api/user")
    app.register_blueprint(chat_bp, url_prefix="/api/chatbot")

    return app
