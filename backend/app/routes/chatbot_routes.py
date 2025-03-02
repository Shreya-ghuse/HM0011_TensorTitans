from flask import Blueprint, jsonify, request
import google.generativeai as genai
from app.models.chatbot import Message

# Configure Google Gemini AI
genai.configure(api_key="AIzaSyBwmRt-EhrKstoWNcdFI3-Bi1lbSuIncCU")
model = genai.GenerativeModel("gemini-1.5-pro")

chat_bp = Blueprint('chatbot', __name__)

@chat_bp.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    # Save user message in database
    Message.create(sender="user", text=user_message)

    try:
        response = model.generate_content(user_message)
        bot_reply = response.text

        # Save bot response in database
        Message.create(sender="bot", text=bot_reply)

        return jsonify({"reply": bot_reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@chat_bp.route("/history", methods=["GET"])
def get_history():
    messages = Message.select().order_by(Message.timestamp)
    chat_history = [{"sender": msg.sender, "text": msg.text, "timestamp": msg.timestamp.strftime("%Y-%m-%d %H:%M:%S")} for msg in messages]
    return jsonify(chat_history)