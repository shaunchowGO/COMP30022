from flask import Flask, request, jsonify
from flask_cors import CORS
from scripts.run_ps_script import run_query


QUERY_SCRIPT = "root/backend/scripts/Query_SQL_SPrincipal.ps1"

app = Flask(__name__)
CORS(app)

@app.route('/api/test', methods=['GET'])
def test_endpoint():
    return 'Hello from the local backend!'

@app.route('/student', methods=['GET'])
def get_student():
    query = "SELECT * FROM [dbo].[student]"
    return run_query(QUERY_SCRIPT, query)

@app.route('/assignment', methods=['GET'])
def get_assignment():
    query = "SELECT * FROM [dbo].[assignment]"
    return run_query(QUERY_SCRIPT, query)

@app.route('/teacher', methods=['GET'])
def get_teacher():
    query = "SELECT * FROM [dbo].[academic]"
    return run_query(QUERY_SCRIPT, query)


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

if __name__ == "__main__":
    app.run(debug=True, port=5000)  