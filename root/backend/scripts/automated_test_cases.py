from time import time
start = time()
from run_ps_script import *

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

query1 = "Select count(distinct studentId) from [dbo].[submission] where AssignmentId = 2"
query2 = "select Name from [dbo].[Academic]"
query3 = "SELECT top(3) table_name FROM INFORMATION_SCHEMA. TABLES"

query_correct1 = {"counter": 2}
query_correct2 = {"Name" : ["Eduardo Rafa", "Yue Federer", "Yolando Djogovic", "Yue YueYue"]}
query_correct3 = {"table_name": ["AcademicsCohort", "Comparison", "StudentsCohort"]}


upload_1 = uploading_assignment("uploading_assignment_to_storage.ps1","test.txt", "testcase", "11112", "500")


reading_1 = downloading_past_assignment("downloading_assignment.ps1", "downloaded_test.txt", "testcase", "11112", "500")

create_folder_1 = create_folder("creating_student_folder.ps1", "testcase/testing1")
create_folder_2 = create_folder("creating_student_folder.ps1", "testcase/testing2")
create_folder_3 = create_folder("creating_student_folder.ps1", "testcase/testing3")

# Querying Sql tables

print("---------------------------- Query Script Testing ----------------------------") 
for i in range(1,4):
    result = run_query(query = locals()[f"query{i}"])
    status =  get_status(compare(result, locals()[f"query_correct{i}"]))
    print("Query number",i," status: " + status)
    
# Uploading Files
print("\n---------------------------- Uploading Assignments ----------------------------")
for i in range(1,2):
    print("File Upload",i," status: " + get_status(locals()[f"upload_{i}"]))

# Reading Past Assignments   
print("\n---------------------------- Reading Assignments ----------------------------")
for i in range(1,2):
    print("File Download",i," status: " + get_status(locals()[f"reading_{i}"]))
    os.remove("downloaded_test.txt")
# Creating Folders
print("\n---------------------------- Creating Folders  ----------------------------")
for i in range(1,4):
    print("Creating Folder", i ,"status:", get_status(locals()[f"create_folder_{i}"]))



duration = time() - start
print("\nExecution Time: " + str(duration))
