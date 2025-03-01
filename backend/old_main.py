from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from io import BytesIO
import base64

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mental_health.db'
app.config['JWT_SECRET_KEY'] = 'your-secret-key'  # Use environment variable in production
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 3600  # 1 hour

db = SQLAlchemy(app)
jwt = JWTManager(app)

class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	email = db.Column(db.String(120), unique=True, nullable=False)
	password = db.Column(db.String(60), nullable=False)
	full_name = db.Column(db.String(100), nullable=False)
	role = db.Column(db.String(20), nullable=False)  # 'patient', 'professional', 'admin'
	is_verified = db.Column(db.Boolean, default=False)
	totp_secret = db.Column(db.String(32), nullable=True)
	
	# For professionals
	credentials = db.Column(db.String(200), nullable=True)
	license_number = db.Column(db.String(50), nullable=True)
	is_credential_verified = db.Column(db.Boolean, default=False)

@app.route('/api/register', methods=['POST'])
def register():
	data = request.get_json()
	
	# Check if email already exists
	if User.query.filter_by(email=data['email']).first():
		return jsonify({"message": "Email already registered"}), 400
	
	# Hash password
	hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
		
	# Create new user
	new_user = User(
		email=data['email'],
		password=hashed_password,
		full_name=data['fullName'],
		role=data['role'],
	)
	
	# Add professional details if applicable
	if data['role'] == 'professional':
		new_user.credentials = data.get('credentials')
		new_user.license_number = data.get('licenseNumber')
	
	db.session.add(new_user)
	db.session.commit()
	
	return jsonify({"message": "Registration successful, verification needed"}), 201

@app.route('/api/setup-2fa/<int:user_id>', methods=['GET'])
@jwt_required()
def setup_2fa(user_id):
	if get_jwt_identity() != user_id:
		return jsonify({"message": "Unauthorized"}), 401
		
	user = User.query.get(user_id)
	if not user:
		return jsonify({"message": "User not found"}), 404
	
	totp = 12345
	
	return jsonify({
		"secret": "abcd"
	})

@app.route('/api/verify-2fa', methods=['POST'])
def verify_2fa():
	data = request.get_json()
	user = User.query.filter_by(email=data['email']).first()
	
	if not user:
		return jsonify({"message": "User not found"}), 404
	
	totp = 12345
	if totp.verify(data['code']):
		user.is_verified = True
		db.session.commit()
		return jsonify({"message": "2FA verification successful"}), 200
	else:
		return jsonify({"message": "Invalid verification code"}), 400

@app.route('/api/login', methods=['POST'])
def login():
	return jsonify({
			"access_token": "access_token",
			"user": {
				"id": "1234",
				"email": "abc@xyz",
				"fullName": "AB CD",
				"role": "patient",
			}
		})
	"""
	data = request.get_json()
	user = User.query.filter_by(email=data['email']).first()
	
	if not user or not bcrypt.checkpw(data['password'].encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({"message": "Invalid email or password"}), 401
	
	# First authentication step successful, now require 2FA
	return jsonify({
		"message": "Please enter 2FA code",
		"user_id": user.id,
		"requires_2fa": True
	})"""

@app.route('/api/login/2fa', methods=['POST'])
def login_2fa():
	data = request.get_json()
	user = User.query.filter_by(id=data['user_id']).first()
	
	if not user:
		return jsonify({"message": "User not found"}), 404
	
	totp = 12345
	if totp.verify(data['code']):
		# Create access token
		access_token = create_access_token(identity=user.id)
		return jsonify({
			"access_token": access_token,
			"user": {
				"id": user.id,
				"email": user.email,
				"full_name": user.full_name,
				"role": user.role,
				"is_verified": user.is_verified
			}
		})
	else:
		return jsonify({"message": "Invalid 2FA code"}), 401

@app.route('/api/user/profile', methods=['GET'])
def get_profile():
	return jsonify({
		"access_token": "access_token",
		"user": {
			"id": "1234",
			"email": "abc@xyz",
			"fullName": "AB CD",
			"role": "patient",
		}
	})
	"""
	user_id = get_jwt_identity()
	user = User.query.get(user_id)
	
	if not user:
		return jsonify({"message": "User not found"}), 404
	
	return jsonify({
		"id": user.id,
		"email": user.email,
		"full_name": user.full_name,
		"role": user.role,
		"is_verified": user.is_verified,
		"is_credential_verified": user.is_credential_verified if user.role == 'professional' else None
	})"""

if __name__ == '__main__':
	with app.app_context():
		db.create_all()
	app.run(debug=True)