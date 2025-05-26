from flask import request, jsonify
import stripe
import stripe.error
from app.api import bp
from app.extensions import db
from app.models import User
from flask_login import current_user, login_required
from os import environ

stripe.api_key = environ.get("STRIPE_TEST_KEY")

@bp.route("/get_current_balance", methods=["GET"])
def get_current_balance():
    try:
        balance = stripe.Balance.retrieve()
        return jsonify(balance=balance)
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
    
@bp.route("/get_prices", methods=['GET'])
def get_prices():
    try:
        prices = stripe.Price.list
        return jsonify(prices=prices.data), 200
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
    
@bp.route("/create_customer", methods=['POST'])
def create_customer():
    data = request.get_json()
    if not data:
        print("Error when creating a customer, no payload in request body")
        return jsonify("Error when creating new customer: no payload in request."), 400
    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    try:
        customer = stripe.Customer.create(
            name=name,
            email=email,
            phone=phone,
        )
        print("Customer created succesfully")
        return jsonify(message=f"{customer.name} has been added!"), 201
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
    

@bp.route("/get_one_customer/<id>", methods=["GET"])
def get_one_customer(id):
    try:
        customer = stripe.Customer.retrieve(str(id))
        return jsonify(customer=customer), 200
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
    
    
@bp.route("/get_all_customers", methods=["GET"])
def get_all_customers():
    try:
        customers = stripe.Customer.list()
        return jsonify(customers=customers.data), 200
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