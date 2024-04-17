import os
import time
import threading

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
client_count = max([0] + list(email_to_client_id.values())) + 1
#########################################

server = Flask(__name__)

query = ""
info = [
    { "imageUrl": "https://cdn.discordapp.com/attachments/792656939573313546/1229816730482638860/image.png?ex=66310f15&is=661e9a15&hm=6fa0e19cc4ad651fd2b15507a9cca259a291575b5e9b762e52d85cb3b5901852&",
      "title": "title1",
      "description": "description1",
      "category": "category1" },
    { "imageUrl": "https://cdn.discordapp.com/attachments/792656939573313546/1229816730482638860/image.png?ex=66310f15&is=661e9a15&hm=6fa0e19cc4ad651fd2b15507a9cca259a291575b5e9b762e52d85cb3b5901852&",
      "title": "title2",
      "description": "description2",
      "category": "category2" },
    { "imageUrl": "https://cdn.discordapp.com/attachments/792656939573313546/1229816730482638860/image.png?ex=66310f15&is=661e9a15&hm=6fa0e19cc4ad651fd2b15507a9cca259a291575b5e9b762e52d85cb3b5901852&",
      "title": "title3",
      "description": "description3",
      "category": "category3" }
]

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
        for row in cursor.fetchall():
            pass

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
    global query, info, cursor
    query = request.get_json()["query"]
    if (query != ""):
        # process the query 
        return jsonify({"data": info})
    return jsonify({"data": []})

if __name__ == "__main__":
    server.run(debug=True)

