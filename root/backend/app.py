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

@app.route('/student', methods=['POST'])
def create_student():
    student_data = request.get_json()
    #call create student folder script

    #call create student entry query 


if __name__ == "__main__":
    app.run(debug=True, port=5000)  