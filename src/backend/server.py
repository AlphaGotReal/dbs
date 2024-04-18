import os
import time
import threading
import datetime

from flask import Flask, jsonify, request
import requests
import json
import mysql.connector

#########################################
with open("data/details.json", "r") as f:
    details = json.load(f)

mydb = mysql.connector.connect(
host = details["host"],
user = details["user"],
password = details["password"],
database = details["database"])

cursor = mydb.cursor(buffered=True)

with open("./data/email_to_id.json", "r") as f:
    email_to_client_id = json.load(f)

with open("./data/transaction_id.json", "r") as f:
    transaction_id = json.load(f)["transaction_id"]

client_count = max([0] + list(email_to_client_id.values())) + 1
#########################################

server = Flask(__name__)

@server.route("/register", methods=["GET", "POST"])
def register():
    global client_count, email_to_client_id, cursor, mydb
    data = request.get_json()
    username = data["username"]
    email = data["email"]

    if (email in email_to_client_id):
        # email already in use
        return jsonify({"successStatus": 0, "client_id": None})

    email_to_client_id[email] = client_count
    with open("./data/email_to_id.json", "w") as f:
        json.dump(email_to_client_id, f)
    password = data["password"]

    # change in the database
    try:
        cursor.execute(f"INSERT into Client value({client_count}, '{username}', '{email}', '{password}')");

        client_count += 1
        mydb.commit();
        return jsonify({"successStatus": 1, "client_id": email_to_client_id[email]})

    except Exception as e:
        print(e)
        mydb.rollback();
        return jsonify({"successStatus": 0, "client_id": None})

    return jsonify({"successStatus": -1, "client_id": None})

@server.route("/login", methods=["GET", "POST"])
def login():
    global cursor, mydb
    data = request.get_json()
    username = data["username"]
    password = data["password"]

    try:
        cursor.execute(f"select password, email from Client where username like '{username}'")
        mydb.commit()

        stored_password, email = cursor.fetchone()
        for row in cursor.fetchall():
            pass

        if (stored_password == password):
            return jsonify({"successStatus": 1, "client_id": email_to_client_id[email]})
        else:
            return jsonify({"successStatus": 2, "client_id": None})

    except Exception as e:
        print(e, type(e))
        return jsonify({"successStatus": 0, "client_id": None})
        mydb.rollback()

    return jsonify({"successStatus": -1, "client_id": None})


@server.route("/process/query", methods=["GET", "POST"])
def process_query():
    global cursor
    data = request.get_json()
    query = data["query"]

    properties_bought = []
    if (data["auth"]["logged"]):
        client_id = data["auth"]["details"]["client_id"]
        try:
            cursor.execute(f"select property_id from Transaction where client_id = {client_id}");
            mydb.commit()

            for row in cursor.fetchall():
                properties_bought.append(row[0])

        except Exception as e:
            print(e, type(e))
            mydb.rollback()

    if (query != ""):
        info = []
        try: 
            cursor.execute(f"""
                select property_id, image_url, property_type, description, address, city, state, zip_code, category_name, rating_value, price, username, size, status, feature_name 
                from Image natural join Property natural join PropertyCategories natural join PropertyRatings natural join Agent natural join PropertyFeatures
                where address like '%{query}%' OR city like '%{query}%' OR state like '%{query}%';
            """)
            mydb.commit()

            for row in cursor.fetchall():
                property_id, imageUrl, title, description, address, city, state, zip_, category, rating, price, agent, size, status, features = row
                info.append({
                    "property_id": property_id,
                    "imageUrl": imageUrl,
                    "title": title,
                    "description": description,
                    "address": address,
                    "city": city,
                    "state": state,
                    "zip": zip_,
                    "category": category,
                    "rating": rating,
                    "price": price,
                    "agent": agent,
                    "size": size,
                    "prop_status": status,
                    "features": features,
                    "transaction_made": (property_id in properties_bought)
                })

        except Exception as e:
            print(e, type(e))
            mydb.rollback()

        return jsonify({"data": info})

    info = []
    try: 
        cursor.execute(f"""
            select property_id, image_url, property_type, description, address, city, state, zip_code, category_name, rating_value, price, username, size, status, feature_name 
            from Image natural join Property natural join PropertyCategories natural join PropertyRatings natural join Agent natural join PropertyFeatures;
        """)
        mydb.commit()

        for row in cursor.fetchall():
            property_id, imageUrl, title, description, address, city, state, zip_, category, rating, price, agent, size, status, features = row
            info.append({
                "property_id": property_id,
                "imageUrl": imageUrl,
                "title": title,
                "description": description,
                "address": address,
                "city": city,
                "state": state,
                "zip": zip_,
                "category": category,
                "rating": rating,
                "price": price,
                "agent": agent,
                "size": size,
                "prop_status": status,
                "features": features,
                "transaction_made": (property_id in properties_bought)
            })

    except Exception as e:
        print(e, type(e))
        mydb.rollback()

    return jsonify({"data": info})

@server.route("/transaction", methods=["GET", "POST"])
def transaction():
    global cursor, transaction_id
    
    data = request.get_json()
    property_id = data["property_id"]
    client_id = data["auth"]["details"]["client_id"]
    date = str(datetime.date.today().strftime("%Y-%m-%d"))

    try:
        cursor.execute(f"select price from Property where property_id = {property_id}")
        price = float(cursor.fetchone()[0])
        mydb.commit()

    except Exception as e:
        print(e, type(e))
        mydb.rollback()
        return jsonify({"successStatus": 0})

    try:
        cursor.execute(f"INSERT INTO Transaction Values ({transaction_id}, {property_id}, {client_id}, '{date}', {price})")
        mydb.commit()
        transaction_id += 1

        with open("./data/transaction_id.json", "w") as f:
            json.dump({"transaction_id": transaction_id}, f)

        return jsonify({"successStatus": 1})

    except Exception as e:
        print(e, type(e))
        mydb.rollback()
        return jsonify({"successStatus": 0})

    return jsonify({"successStatus": -1})

if __name__ == "__main__":
    server.run(debug=True)

