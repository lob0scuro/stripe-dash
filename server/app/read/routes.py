from flask import request, jsonify
from app.read import bp
from app.models import User
from app.extensions import db


@bp.route("/fetch_all_users", methods=['GET'])
def fetch_all_users():
    try:
        users = User.query.all()
        if not users:
            print("Error: could not query users")
            return jsonify(error="Could not fetch users"), 400
        return jsonify(users=[user.serialize() for user in users]), 200
    except Exception as e:
        print(f"Error when fetching all users: {e}")
        return jsonify(error=f"Error: {e}"), 500