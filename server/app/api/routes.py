from flask import request, jsonify
import stripe
import stripe.error
from app.api import bp
from app.extensions import db
from app.models import User
from flask_login import current_user, login_required
from os import environ

stripe.api_key = environ.get("STRIPE_TEST_KEY")
@bp.route("/get_products", methods=["GET"])
def get_products():
    try:
        products = stripe.Product.list(limit=10)
        return jsonify(products=products.data), 200
    except stripe.error.InvalidRequestError as e:
        print(f"Request Error: {e}")
        return jsonify(error=f"Request Error: {e}"), 500
    except stripe.error.AuthenticationError as e:
        print(f"Authentication Error: {e}")
        return jsonify(error=f"Authentication Error: {e}"), 500
    except stripe.error.APIConnectionError as e:
        print(f"API Connection Error: {e}")
        return jsonify(error=f"API Connection Error: {e}"), 500
    except stripe.error.StripeError as e:
        print(f"Stripe Error: {e}")
        return jsonify(error=f"Stripe Error: {e}"), 500
    except Exception as e:
        print(f"Error: {e}")
        return jsonify(error=f"Error: {e}"), 500