from flask import request, jsonify
from app.auth import bp
from app.models import User
from app.extensions import db, bcrypt
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, current_user, login_required


@bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        if not data:
            print("Error: no data in payload")
            return jsonify(error="Error: Not data in payload"), 400
        first_name = data.get("first_name").capitalize()
        last_name = data.get("last_name").capitalize()
        email = data.get("email")
        pw1 = data.get("password1")
        pw2 = data.get("password2")
        is_admin = data.get("is_admin")
        
        if pw1 != pw2:
            print("Error: Passwords do not match")
            return jsonify(error="Error: passwords do not match, please check inputs and try again"), 400
        hashed_password = generate_password_hash(pw1).decode("utf-8")
        new_user = User(first_name=first_name, last_name=last_name, password=hashed_password, email=email, is_admin=is_admin)
        db.session.add(new_user)
        db.session.commit()
        return jsonify(message=f"{new_user.first_name} has been registered!"), 201
    except Exception as e:
        db.session.rollback()
        print(f"Error when registering new user: {e}")
        return jsonify(f"Error when registering new user: {e}"), 500
    
@bp.route("/login", methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data:
            print("Error: no payload in request")
            return jsonify(error="Error: no payload in request"), 400
        id = data.get("id")
        password = data.get("password")
        if not id or not password:
            print("Error: empty fields not allowed during login")
            return jsonify(error="All fields required for login"), 400
        user = User.query.get(id)
        if not check_password_hash(password, user.password):
            print("Invalid credentials given during login process")
            return jsonify(error="Invalid credientiols, please check inputs and try again"), 401
        login_user(user)
        return jsonify(message=f"{user.first_name} has been logged in"), 200
    except Exception as e:
        print(f"Error when logging in: {e}")
        return jsonify(error=f"Error when logging in: {e}"), 500
    
    
@bp.route("/logout", methods=["GET"])
@login_required
def logout():
    try:
        logout_user()
        return jsonify(message="You have been logged out"), 200
    except Exception as e:
        print(f"Error durinig logout: {e}")
        return jsonify(f"Error during logout: {e}"), 500