from flask import Flask
from flask_cors import CORS

app = Flask(_name_)
CORS(app)  # Allow requests from frontend

@app.route("/", methods=["GET"])
def home():
    return "Flask backend is running!"

if _name_ == "_main_":
    app.run(host="0.0.0.0", port=5000)
