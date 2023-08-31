from flask import Flask
import pyodbc

app = Flask(__name__)

server = "tcp:sql-server-capstone-project.database.windows.net,1433"
database = "sql-db-capstone-project"
username = "CloudSAf565423b"
password = ""
connection_string = (
    f"DRIVER={{ODBC Driver 17 for SQL Server}};"
    f"SERVER={server};DATABASE={database};"
    f"UID={username};PWD={password};"
)

conn = pyodbc.connect(connection_string)


@app.route('/students/<int:student_id>', methods=['GET'])
def get_student_profile(student_id):
    try:
        cursor = conn.cursor()
        query = f"INSERT QUERY HERE"
        cursor.execute(query)
        row = cursor.fetchone()

        if row:
            student_profile = {
                "name": row[0],
                "student_number": row[1],
                "assignment_details": row[2],
                "display_picture": row[3]
            }
            return jsonify(student_profile)
        else:
            return jsonify({"error": "Student not found"})
    except pyodbc.Error as e:
        return jsonify({"error": "Database error"})
    finally:
        cursor.close()
