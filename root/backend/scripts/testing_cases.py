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

query1 = "Select AssignmentId,  StudentId, SubmissionId  from [dbo].[submission] where AssignmentId = 100"
query2 = "select * from [dbo].subject"
query3 = "select Name from [dbo].[Academic]"
query4 = "SELECT top(3) table_name FROM INFORMATION_SCHEMA. TABLES"

query_correct1 = {"AssignmentId": [100,100], "StudentId" : [11111,11112], "SubmissionId": [100001, 100002]}
query_correct2 = {"Id": [8000, 8001, 8002], "Name" : ["IT-Project", "Arts", "History"]}
query_correct3 = {"Name" : ["Eduardo", "Yue", "Yolando"]}
query_correct4 = {"table_name": ["AcademicsCohort", "Comparison", "StudentsCohort"]}

upload_1 = uploading_assignment("C:/Users/youni/Desktop/CapStoneProject/PowerShell/uploading_assignment_to_storage.ps1","temp.txt", "IT-Project", "11112", "500")
upload_2 = uploading_assignment("C:/Users/youni/Desktop/CapStoneProject/PowerShell/uploading_assignment_to_storage.ps1","run_ps_script - Copy.txt", "Arts", "11112", "500")
upload_3 = uploading_assignment("C:/Users/youni/Desktop/CapStoneProject/PowerShell/uploading_assignment_to_storage.ps1","down.txt", "History", "11112", "500")
upload_4 = uploading_assignment("C:/Users/youni/Desktop/CapStoneProject/PowerShell/uploading_assignment_to_storage.ps1","down.txt", "History", "11111", "600")


reading_1 = downloading_past_assignment("C:/Users/youni/Desktop/CapStoneProject/PowerShell/downloading_assignment.ps1", "C:/Users/youni/Desktop/CapStoneProject/PowerShell/test1.txt", "IT-Project", "11112", "500")
reading_2 = downloading_past_assignment("C:/Users/youni/Desktop/CapStoneProject/PowerShell/downloading_assignment.ps1", "C:/Users/youni/Desktop/CapStoneProject/PowerShell/test2.txt", "Arts", "11112", "500")
reading_3 = downloading_past_assignment("C:/Users/youni/Desktop/CapStoneProject/PowerShell/downloading_assignment.ps1", "C:/Users/youni/Desktop/CapStoneProject/PowerShell/test3.txt", "History", "11112", "500")
reading_4 = downloading_past_assignment("C:/Users/youni/Desktop/CapStoneProject/PowerShell/downloading_assignment.ps1", "C:/Users/youni/Desktop/CapStoneProject/PowerShell/test4.txt", "History", "11111", "600")

create_folder_1 = create_folder("C:/Users/youni/Desktop/CapStoneProject/PowerShell/creating_student_folder.ps1", "testcase/test1")
create_folder_2 = create_folder("C:/Users/youni/Desktop/CapStoneProject/PowerShell/creating_student_folder.ps1", "testcase/test2")
create_folder_3 = create_folder("C:/Users/youni/Desktop/CapStoneProject/PowerShell/creating_student_folder.ps1", "testcase/test3")
create_folder_4 = create_folder("C:/Users/youni/Desktop/CapStoneProject/PowerShell/creating_student_folder.ps1", "testcase/test4")

# Querying Sql tables

print("---------------------------- Query Script Testing ----------------------------") 
for i in range(1,5):
    result = run_query(query = locals()[f"query{i}"])
    status =  get_status(compare(result, locals()[f"query_correct{i}"]))
    print("Query number",i," status: " + status)
    
# Uploading Files
print("\n---------------------------- Uploading Assignments ----------------------------")
for i in range(1,5):
    print("File Upload",i," status: " + get_status(locals()[f"upload_{i}"]))

# Reading Past Assignments   
print("\n---------------------------- Reading Assignments ----------------------------")
for i in range(1,5):
    print("File Upload",i," status: " + get_status(locals()[f"reading_{i}"]))

# Creating Folders
print("\n---------------------------- Creating Folders  ----------------------------")
for i in range(1,5):
    print("Creating Folder", i ,"status:", get_status(locals()[f"create_folder_{i}"]))



duration = time() - start
print("\nExecution Time: " + str(duration))
