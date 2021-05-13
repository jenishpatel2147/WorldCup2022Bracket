from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import psycopg2
import os

load_dotenv()

# PostgreSQL Database credentials loaded from the .env file
DATABASE = os.getenv('DATABASE')
DATABASE_USERNAME = os.getenv('DATABASE_USERNAME')
DATABASE_PASSWORD = os.getenv('DATABASE_PASSWORD')

app = Flask(__name__)

# CORS implemented so that we don't get errors when trying to access the server from a different server location
CORS(app)


try:
    con = psycopg2.connect(
        database=DATABASE,
        user=DATABASE_USERNAME,
        password=DATABASE_PASSWORD)

    cur = con.cursor()

    # GET: Fetch all users from the database
    @app.route('/')
    def fetch_all_users():
        cur.execute('SELECT * FROM users')
        rows = cur.fetchall()
        print(rows)

        return jsonify(rows)

    # GET: Fetch user by email from the database
    @app.route('/<string:email>')
    def fetch_by_email(email=None):
        cur.execute(f'SELECT * FROM users WHERE email = {email}')
        rows = cur.fetchall()
        print(rows)

        return jsonify(rows)

    # POST: Create a user and add the user to the database
    @app.route('/add-user', methods=['GET', 'POST'])
    def add_user():
        if request.method == 'POST':
            data = request.form.to_dict()
            print(data)
            cur.execute("INSERT INTO users (first_name, username, last_name, password, email) VALUES (%s, %s, %s, %s, %s)",
                        (f"{data['first_name']}", f"{data['username']}", data['last_name'], f"{data['password']}",
                         f"{data['email']}"))
            con.commit()
            return 'Form submitted'
        else:
            return 'Form submission failed'

    # DELETE: Delete user by email from the database
    @app.route('/delete-user', methods=['GET', 'DELETE'])
    def delete_by_user():
        data = request.form.to_dict()
        print(data['email'])
        cur.execute(
            f"DELETE FROM users WHERE email = {data['email']} RETURNING first_name")
        con.commit()

        return 'Delete user by email'

    # PUT: Update users table by email from the database
    @app.route('/update-email', methods=['GET', 'PUT'])
    def update_by_id():
        data = request.form.to_dict()
        old_email = data['email']
        new_email = data['new_email']
        cur.execute(
            'UPDATE USERS SET email = {new_email} WHERE email = {email}')
        con.commit()

        return 'Email Updated'

except Exception as msg:
    print(msg) 
    print('Error Failed')