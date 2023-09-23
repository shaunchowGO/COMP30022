from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

if __name__ == "__main__":
    app.run(debug=True)  


@app.route('/api/test', methods=['GET'])
def test_endpoint():
    return 'Hello from the local backend!'

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return "No file part", 400

    file = request.files['file']

    if file.filename == '':
        return "No selected file", 400

    if file:
        # call script here

        return "File uploaded successfully", 200

    return "Something went wrong", 500