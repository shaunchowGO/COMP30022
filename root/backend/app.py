from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
#import pyodbc
from scripts.sql import run_sql_query
from scripts.SQL_queries_dynamic.sql_queries import students_in_subject_query, subject_page_query, submissions_for_assignment, submissions_for_student , teacher_page_query
import bcrypt
from scripts.run_ps_script import uploading_assignment, downloading_past_assignment
import os
from algorithm_scripts.algorithm import similarity_score
from datetime import datetime


app = Flask(__name__)
CORS(app)

# =============================================================	Students    ============================================================= //

#get student info from DB 
@app.route('/student', methods=['GET'])
def get_student():
    student_id = request.args.get('studentID')
    q = "SELECT * FROM [dbo].[student] WHERE Id = ?"
    query = q.replace("?", str(student_id))
    res =  run_sql_query(query)
    
    formatted_rows = []
    for row in res:
        formatted_row = {
            'Id': row.Id,
            'Name': row.Name
        }
        formatted_rows.append(formatted_row)
    return formatted_rows

# view the student profile info (e.g. files)
@app.route('/student_files', methods=['GET'])
def get_student_files():
    student_id = request.args.get('studentID')
    q = "SELECT A.[Name] as Assignment_Name, Sj.[Name] as [Subject], S.[Similarity_Score], S.[Date] as Date_AddedFROM [dbo].[Submission] as S inner join dbo.[Assignment] as A on S.AssignmentId = A.Id inner join dbo.Subject as Sj on A.SubjectId = Sj.Id where S.StudentId = ?"
    query = q.replace("?", str(student_id))
    res =  run_sql_query(query)
    
    formatted_rows = []
    for row in res:
        formatted_row = {
            'Id': row.Id,
            'Name': row.Name
        }
        formatted_rows.append(formatted_row)
    return formatted_rows

#get student in subject
@app.route('/subject_student', methods=['GET'])
def get_subject_student():
    subject_id = request.args.get('subjectID')
    q = "SELECT * FROM [dbo].[StudentsCohort] AS sc INNER JOIN [dbo].[Student] AS s ON s.id = sc.StudentId WHERE sc.subjectId = ?"
    query = q.replace("?", str(subject_id))
    res =  run_sql_query(query) 

    formatted_rows = []
    for row in res:
        formatted_row = {
            'Id': row.Id,
            'Name': row.Name
        }
        formatted_rows.append(formatted_row)
    return formatted_rows

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

#Routes for Deleting Entries in SQL
#Delete Student Entry by ID
@app.route('/student/<int:id>', methods=['DELETE'])
def delete_student(id):

    query = "DELETE FROM [dbo].[student] WHERE Id = ?"
    params = (id,)
    run_sql_query(query, params)

    response = {
        "message": f"Student with ID {id} deleted successfully"
    }

    return jsonify(response), 204 

#get teacher info 
@app.route('/student_all', methods=['GET'])
def get_student_all():
    query = "SELECT * FROM [dbo].[student]"
    res =  run_sql_query(query)
    formatted_rows = []
    for row in res:
        formatted_row = {
            'Id': row.Id,
            'Name': row.Name
        }
        formatted_rows.append(formatted_row)

    print(formatted_rows)
    return formatted_rows

#get student info from DB 
@app.route('/students', methods=['GET'])
def get_students_in_subject():
    subject_id = request.args.get('subjectID')
    query = students_in_subject_query.replace("?", str(subject_id))
    res =  run_sql_query(query)
    
    formatted_rows = []
    for row in res:
        formatted_row = {
            'Id': row.Id,
            'Name': row.Name
        }
        formatted_rows.append(formatted_row)
    return formatted_rows



# =============================================================	Teachers    ============================================================= //

# Routes for SQL Insertion 
#get teacher info 
@app.route('/teacher1', methods=['GET'])
def get_teacher_all():
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

#get teacher info from DB 
@app.route('/teacher', methods=['GET'])
def get_teacher():
    teacher_id = request.args.get('teacherID')
    q = "SELECT * FROM [dbo].[academic] WHERE Id = ?"
    query = q.replace("?", str(teacher_id))
    res =  run_sql_query(query)
    
    formatted_row = []
    if res:
        formatted_row = {
            'Id': res[0].Id,
            'Name': res[0].Name
        }
        
    return formatted_row

@app.route('/new_academic', methods=['POST'])
def create_academic():
    academic_data = request.get_json()
    academic_name = academic_data['firstName'] + " " + academic_data['lastName']
    print(academic_name)
    query = "INSERT INTO [dbo].[academic] (Name, Id) VALUES (?, ?)"
    params = (academic_name, academic_data['aId'])
    run_sql_query(query, params)

    response = {
        "message": "Student Profile created successfully:",
        "student_data": academic_data
    }

    return jsonify(response), 201

#get teacher page info based on academicID 
@app.route('/teacher-info', methods=['GET'])
def get_teacher_info():
    academic_id = request.args.get('teacherID')
    params = (academic_id)
    query = teacher_page_query.replace("?", str(params))
    res =  run_sql_query(query)
    
    formatted_rows = []
    for row in res:
        formatted_row = {
            'Subject': row.Subject,
            'SubjectID': row.ID,
            'Assignments': row.AssignmentCount,
            'Students': row.StudentCount
        }
        formatted_rows.append(formatted_row)
    return formatted_rows

# =============================================================	Logins    ============================================================= //

@app.route('/login', methods=['GET'])
def get_login():
    login_username = request.args.get('username')
    login_password = request.args.get('password')

    password_q = "SELECT * FROM [dbo].[login] WHERE Username = ?"
    password_query = password_q.replace("?", "'" + str(login_username) + "'", 1) 
    res_pass = run_sql_query(password_query)
    hashed_password = None
    if (len(res_pass) > 0) :
        hashed_password = res_pass[0][1]
        
    q = "SELECT * FROM [dbo].[login] WHERE Username = ? AND Password = ?"
    query = q.replace("?", "'" + str(login_username) + "'", 1) 
    query = query.replace("?", "'" + str(login_password) + "'", 1)

    if hashed_password is not None:
        # Use bcrypt.checkpw to verify the entered password
        if bcrypt.checkpw(login_password.encode('utf-8'), hashed_password.encode('utf-8')):
            q = "SELECT * FROM [dbo].[login] WHERE Username = ? AND Password = ?"
            query = q.replace("?", "'" + str(login_username) + "'", 1) 
            query = query.replace("?", "'" + str(hashed_password) + "'", 1)

    res = run_sql_query(query)


    formatted_rows = []
    for row in res:
        formatted_row = {
            'Id': row.Id,
            'Username': row.Username
        }
        formatted_rows.append(formatted_row)
    return formatted_rows

@app.route('/comp_login', methods=['GET'])
def compare_login():
    login_username = request.args.get('username')
    q = "SELECT * FROM [dbo].[login] WHERE Username = ?"
    query = q.replace("?", "'" + str(login_username) + "'", 1) 
    res = run_sql_query(query)

    formatted_rows = []
    for row in res:
        formatted_row = {
            'Id': row.Id,
            'Username': row.Username
        }
        formatted_rows.append(formatted_row)

    if (len(formatted_rows) == 0) :
        return 'new'
    return 'old'

@app.route('/signup', methods=['POST'])
def create_account():
    account_data = request.get_json()
    hashed_password = bcrypt.hashpw(account_data['password'].encode('utf-8'), bcrypt.gensalt())

    #call create student entry query 
    query = "INSERT INTO [dbo].[login] (Username, Password, Id) VALUES (?, ?, ?)"
    params = (account_data['username'], hashed_password, account_data['aId'])
    run_sql_query(query, params)
    print(hashed_password)
    response = {
        "message": "New Account created successfully:",
        "account_data": account_data
    }

    return jsonify(response), 201

# =============================================================	Assignments    ============================================================= //

#get Assignment Info from DB 
@app.route('/assignment', methods=['GET'])
def get_assignment():
    subject_id = request.args.get('subjectID')
    q = "SELECT * FROM [dbo].[assignment] WHERE Id = ?"
    query = q.replace("?", str(subject_id))
    res =  run_sql_query(query)
    
    formatted_rows = []
    for row in res:
        formatted_row = {
            'Id': row.Id,
            'Name': row.Name,
            'SubjectId': row.SubjectId
        }
        formatted_rows.append(formatted_row)
    return formatted_rows

#get submission info from DB 
@app.route('/submissions', methods=['GET'])
def get_submission():
    assignment_id = request.args.get('assignmentID')
    q = "SELECT * FROM [dbo].[Submission] WHERE AssignmentId = ?"
    query = q.replace("?", str(assignment_id))
    res =  run_sql_query(query)
    
    formatted_row = []
    for row in res:
        formatted_row = {
            'AssignmentId': row.AssignmentId,
            'StudentId': row.StudentId,
            'SubmissionId': row.SubmissionId,
            'Date': row.Date,
            'Similarity_Score': row.Similarity_Score
        }
        
    return formatted_row

# Receives assignment_data from the frontend and Inserts that into the DB 
@app.route('/assignment', methods=['POST'])
def create_assignment():
    assignment_data = request.get_json()

    #call create assignment entry query 
    query = "INSERT INTO [dbo].[Assignment] (SubjectId, Name) VALUES (?, ?)"
    params = (assignment_data['id'], assignment_data['name'])
    run_sql_query(query, params)


    response = {
        "message": "Assignment Profile created successfully:",
        "assignment_data": assignment_data
    }

    return jsonify(response), 201

#Delete Assignment Entry by ID
@app.route('/assignment/<int:id>', methods=['DELETE'])
def delete_assignment(id):

    query = "DELETE FROM [dbo].[Assignment] WHERE Id = ?"
    params = (id,)
    run_sql_query(query, params)

    response = {
        "message": f"Assignment with ID {id} deleted successfully"
    }

    return jsonify(response), 204  

#download file from file storage temporarily and returns it
@app.route('/download', methods=['GET'])
def download_submission():
    subject_name = request.args.get('subjectName')
    studentID = request.args.get('studentID')
    assignmentID = request.args.get('assignmentID')
    downloading_past_assignment(filepath='scripts/downloading_assignment.ps1', download_file_path='temp.txt', subject_name=subject_name, studentID=studentID, assignmentID=assignmentID)
    file_path = 'temp.txt'

    return send_file(file_path, as_attachment=True)

#Routes to connect to the File Storage 

#Uploads a file to the File Storage 
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return "No file part", 401

    file = request.files['file']
    request_dict = dict(request.form)

    if 'subject_name' not in request_dict:
        return "No Subject Data", 414

    if 'studentID' not in request_dict:
        return "No Student Data", 415

    if file.filename == '':
        return "No selected file", 400
    if file:
        # call script here
        file_content = file.read()
        with open('temp.txt', 'wb') as f:
            f.write(file_content)

        assignmentId = request_dict['assignmentID']
        subjectName = request_dict['subject_name']
        studentId = request_dict['studentID']
        uploading_assignment(filepath='scripts/uploading_assignment_to_storage.ps1',textfilepath='temp.txt', subject_name=subjectName, studentID=studentId, assignmentID=assignmentId)
        score = similarity_score(assignment_file_path="temp.txt",
                                 w2v_model_file_path = "algorithm_scripts/word2vec_model.model",
                                 base_network_model_file_path = "algorithm_scripts/Base_Network_model_Trained_Model_Saved.model",
                                 clf_network_model_file_path = "algorithm_scripts/clf_network",
                                 known_written_file_path = "algorithm_scripts/testing_dict.pickle")
        #os.remove("temp.txt")

        query = "INSERT INTO [dbo].[Submission] ([AssignmentId], [StudentId], [Date], [Similarity_Score]) VALUES (?, ?, ?, ?)"
        params = (assignmentId, studentId, datetime.now(), int(score*100))
        run_sql_query(query, params)
        print("SCORE",score)
        print("DEEET",subjectName, studentId, assignmentId)
        return file_content, score

    return "Something went wrong", 500

#get submission page info based on academicID 
@app.route('/assignment-info', methods=['GET'])
def get_assignment_info():
    academic_id = request.args.get('studentID')
    params = (academic_id)
    query = submissions_for_assignment.replace("?", str(params))
    res =  run_sql_query(query)
    print(res)
    formatted_rows = []
    for row in res:
        formatted_row = {
            'Name': row.Name,
            'similarityScore': row.similarity_score,
            'Date': row.DateAdded
            }
        formatted_rows.append(formatted_row)
    return formatted_rows


# =============================================================	Subjects    ============================================================= //

#get Subject Info from DB 
@app.route('/subject', methods=['GET'])
def get_subject():
    subject_id = request.args.get('subjectID')
    q = "SELECT * FROM [dbo].[Subject] WHERE Id = ?"
    query = q.replace("?", str(subject_id))
    res =  run_sql_query(query)
    
    formatted_row = []
    if res:
        formatted_row = {
            'Id': res[0].Id,
            'Name': res[0].Name
        }
        
    return formatted_row

#get subject page info based on academicID 
@app.route('/subject-info', methods=['GET'])
def get_subject_info():
    academic_id = request.args.get('subjectID')
    params = (academic_id)
    query = subject_page_query.replace("?", str(params))
    res =  run_sql_query(query)
    
    formatted_rows = []
    for row in res:
        formatted_row = {
            'ID': row.Id,
            'SubjectId': row.SubjectId,
            'Name': row.Name,
            }
        formatted_rows.append(formatted_row)
    return formatted_rows

# =============================================================	Classrooms    ============================================================= //

@app.route('/subject_student', methods=['POST'])
def add_student_classroom():
    student_data = request.get_json()
    print(student_data)
    query = "INSERT INTO [dbo].[StudentsCohort]  (SubjectId, StudentId) VALUES (?,  ?)"
    params = (student_data['subject_id'], student_data['Id'])
    run_sql_query(query, params)
    print(query)

    response = {
        "message": "Student Profile created successfully:",
        "student_data": student_data
    }

    return jsonify(response), 201

# Receives classroom_data from the frontend and Inserts that into the DB 
@app.route('/classroom', methods=['POST'])
def create_classroom():
    classroom_data = request.get_json()
    academicID = request.args.get('academicID')

    #call create classroom entry query 
    query = "INSERT INTO [dbo].[Subject] (Name, Id) VALUES (?, ?)"
    params = (classroom_data['name'], classroom_data['id'])
    run_sql_query(query, params)

    query1 = "INSERT INTO [dbo].[AcademicsCohort] (SubjectId, AcademicId) VALUES (?, ?)"
    params1 = (classroom_data['id'], academicID)
    run_sql_query(query1, params1)
    
    response = {
        "message": "Classroom Profile created successfully:",
        "classroom_data": classroom_data
    }

    return jsonify(response), 201

#Delete Classroom entry By ID
@app.route('/classroom/<int:id>', methods=['DELETE'])
def delete_classroom(id):

    query = "DELETE FROM [dbo].[Subject] WHERE Id = ?"
    params = (id,)
    run_sql_query(query, params)

    response = {
        "message": f"Classroom with ID {id} deleted successfully"
    }

    return jsonify(response), 204  


if __name__ == "__main__":
    app.run(debug=True, port=5000)  