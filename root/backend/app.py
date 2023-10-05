from flask import Flask, request, jsonify
from flask_cors import CORS
#import pyodbc
#from scripts.run_ps_script import run_query
from api.sql import run_sql_query


QUERY_SCRIPT = "scripts/Query_SQL_SPrincipal.ps1"

app = Flask(__name__)
CORS(app)

#get student info
@app.route('/student', methods=['GET'])
def get_student():
    query = "SELECT * FROM [dbo].[student]"
    res =  run_sql_query(query)
    
    formatted_rows = []
    for row in res:
        formatted_row = {
            'Id': row.Id,
            'Name': row.Name
        }
        formatted_rows.append(formatted_row)
    return formatted_rows

@app.route('/assignment', methods=['GET'])
def get_assignment():
    query = "SELECT * FROM [dbo].[assignment]"
    res =  run_sql_query(query)
    
    formatted_rows = []
    for row in res:
        formatted_row = {
            'Id': row.Id,
            'SubjectId': row.SubjectId,
            'StartDate': row.StartDate,
            'DueDate': row.DueDate
        }
        formatted_rows.append(formatted_row)
    return formatted_rows

#get teacher info 
@app.route('/teacher', methods=['GET'])
def get_teacher():
    query = "SELECT * FROM [dbo].[academic]"
    res =  run_sql_query(query)
    
    formatted_rows = []
    for row in res:
        formatted_row = {
            'Id': row.Id,
            'Name': row.Name
        }
        formatted_rows.append(formatted_row)
    return formatted_rows

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return "No file part", 400

    file = request.files['file']

    if file.filename == '':
        return "No selected file", 400

    if file:
        # call script here
        f = open(file)
        filename = file.filename
        

        return f"File uploaded successfully: {f}", 200

    return "Something went wrong", 500

# Routes for SQL Insertion 

# Receives student_data from the frontend and Inserts that into the DB 
@app.route('/student', methods=['POST'])
def create_student():
    student_data = request.get_json()
    #call create student folder script

    #call create student entry query 
    query = "INSERT INTO [dbo].[student] (Name, Id) VALUES (?, ?)"
    params = (student_data['name'], student_data['id'])
    run_sql_query(query, params)

    response = {
        "message": "Student Profile created successfully:",
        "student_data": student_data
    }

    return jsonify(response), 201

# Receives assignment_data from the frontend and Inserts that into the DB 
@app.route('/assignment', methods=['POST'])
def create_assignment():
    assignment_data = request.get_json()

    #call create assignment entry query 
    query = "INSERT INTO [dbo].[Assignment] (Id, SubjectId, DueDate, StartDate) VALUES (?, ?, ?, ?)"
    params = (assignment_data['id'], assignment_data['name'], assignment_data['dueDate'], assignment_data['startDate'])
    run_sql_query(query, params)

    response = {
        "message": "Assignment Profile created successfully:",
        "assignment_data": assignment_data
    }

    return jsonify(response), 201

# Receives classroom_data from the frontend and Inserts that into the DB 
@app.route('/classroom', methods=['POST'])
def create_classroom():
    classroom_data = request.get_json()

    #call create classroom entry query 
    query = "INSERT INTO [dbo].[Subject] (Name, Id) VALUES (?, ?)"
    params = (classroom_data['name'], classroom_data['id'])
    run_sql_query(query, params)

    response = {
        "message": "Classroom Profile created successfully:",
        "classroom_data": classroom_data
    }

    return jsonify(response), 201


if __name__ == "__main__":
    app.run(debug=True, port=5000)  