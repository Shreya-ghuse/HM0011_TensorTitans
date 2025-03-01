import bcrypt
from flask_jwt_extended import create_access_token
from app.models.user import User

# Hash Password
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# Verify Password
def verify_password(password, hashed_password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

# Register User
def register_user(data):
    if User.select().where(User.email == data['email']).exists():
        return {"message": "Email already registered"}, 400

    hashed_password = hash_password(data['password'])
    new_user = User.create(
        email=data['email'],
        password=hashed_password,
        full_name=data['fullName'],
        role=data['role'],
        credentials=data.get('credentials'),
        license_number=data.get('licenseNumber')
    )
    return {"message": "Registration successful, verification needed"}, 201

# Authenticate User
def authenticate_user(email, password):
    user = User.get_or_none(User.email == email)
    if not user or not verify_password(password, user.password):
        return None
    return user

# Generate JWT Token
def generate_token(user_id):
    return create_access_token(identity=user_id)
