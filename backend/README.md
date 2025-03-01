# MindfulConnect Backend

This is the backend of the **Mental Health Support Platform**, built using **Flask**. It provides authentication, user management, and two-factor authentication (2FA) for security.

## Features
- User registration with **bcrypt** password hashing
- Role-based users: **patients, professionals, admins**
- **JWT authentication** for secure login
- **Two-Factor Authentication (2FA)** using TOTP and QR codes
- **SQLite database** for data storage
- **CORS support** for frontend integration
- Secure API endpoints using **Flask-RESTful**

## Installation & Setup

### Prerequisites
- Python 3.8+
- Virtual environment (recommended)

### Setup Instructions

1. **Clone the repository (if applicable)**  
   ```sh
   git clone <repo-url>
   cd <repo-folder>
