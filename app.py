from flask import Flask, render_template, request, jsonify
import requests
import random
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
BASE = "http://numbersapi.com/"


@app.route("/")
def homepage():
    """Show homepage."""

    return render_template("index.html")


@app.route('/api/get-lucky-num', methods=['POST'])
def lucky_num():
    name = request.get_json().get('name')
    email = request.get_json().get('email')
    year = request.get_json().get('year')
    color = request.get_json().get('color')
    lucky_number = generate_number()
    trivia_response_lucky_number = get_trivia(lucky_number)
    trivia_response_year = get_year_trivia(year)

    error_message = {'Error': "All fields are required please resubmit"}
    if not name or not email or not year or not color:
        return jsonify(error_message)

    else:

        info = {"num": {"fact": trivia_response_lucky_number, "num": lucky_number}, "year": {"fact": trivia_response_year, "year": year}
                }
        return jsonify(info)


def generate_number():
    return random.randint(1, 100)


def get_trivia(lucky_number):
    lucky_number_object = requests.get(BASE + f"{lucky_number}")
    lucky_number_trivia = lucky_number_object.text

    return lucky_number_trivia


def get_year_trivia(birth_year):
    birth_year_object = requests.get(BASE + f"{birth_year}/year")
    birth_year_trivia = birth_year_object.text
    return birth_year_trivia
