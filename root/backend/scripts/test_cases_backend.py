from time import time
start = time()
from run_ps_script_linux import *
import os
def compare(obj, ans):
    if type(obj) is dict:
        for k in obj.keys():
            for i in range(len(obj[k])):
                if ( str(obj[k][i]).strip() != str(ans[k][i]).strip()):
                    print(str(obj[k][i])+"-"+str(ans[k][i])+"-")
                    return False

    return True

def get_status(var):
    if(var or var is None):
       return "Success"
    return "Fail"
queries = {
    "query1" : "Select count(distinct studentId) from [dbo].[submission] where AssignmentId = 2",
    "query2" : "select Name from [dbo].[Academic]",
    "query3" : "SELECT top(3) table_name FROM INFORMATION_SCHEMA. TABLES"
}

queriesCorrect= {
    "query_correct1" : {"counter": 2},
    "query_correct2" : {"Name" : ["Eduardo Rafa", "Yue Federer", "Yolando Djogovic", "Yue YueYue"]},
    "query_correct3" : {"table_name": ["AcademicsCohort", "Comparison", "StudentsCohort"]}
}

upload= {
    "upload_1" : uploading_assignment("root/backend/scripts/test.txt", "testcase", "11111", "5500", linux=1)
}

reading ={
    "reading_1" : downloading_past_assignment("root/backend/scripts/downloading_assignment.ps1", "root/backend/scripts/downloaded_test.txt", "testcase", "11112", "500", linux=1)
}

creating={
    "create_folder_1" : create_folder("root/backend/scripts/creating_student_folder.ps1", "testcase/testing1", linux=1),
    "create_folder_2" : create_folder("root/backend/scripts/creating_student_folder.ps1", "testcase/testing2", linux=1),
    "create_folder_3" : create_folder("root/backend/scripts/creating_student_folder.ps1", "testcase/testing3", linux=1)
}
# Querying Sql tables
def test_backend():
    print("---------------------------- Query Script Testing ----------------------------") 
    for i in range(1,4):
        result = run_query(query = queries[f"query{i}"], linux=1)
        status =  get_status(compare(result, queriesCorrect[f"query_correct{i}"]))
        print("Query number",i," status: " + status)
        assert(status)=="Success"
        
    # Uploading Files
    print("\n---------------------------- Uploading Assignments ----------------------------")
    for i in range(1,2):
        print("File Upload",i," status: " + get_status(upload[f"upload_{i}"]))
        assert(get_status(upload[f"upload_{i}"]))=="Success"

    # Reading Past Assignments   
    print("\n---------------------------- Reading Assignments ----------------------------")
    for i in range(1,2):
        print("File Download",i," status: " + get_status(reading[f"reading_{i}"]))
        os.remove("root/backend/scripts/downloaded_test.txt")
        assert(get_status(reading[f"reading_{i}"]))=="Success"
    # Creating Folders
    print("\n---------------------------- Creating Folders  ----------------------------")
    for i in range(1,4):
        print("Creating Folder", i ,"status:", get_status(creating[f"create_folder_{i}"]))
        assert(get_status(creating[f"create_folder_{i}"]))=="Success"


duration = time() - start
print("\nExecution Time: " + str(duration))
