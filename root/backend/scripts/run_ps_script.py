

#NOTE ALL PATHS HAVE A DOUBLE SLASH "\\" OR "/" but not "\"

def run_query(filepath = "root/backend/scripts/Query_SQL_SPrincipal.ps1", query= "SELECT * FROM [dbo].[submission]"):

    # Note filepath has to "\\" or "/" but not "\"
    import sys, subprocess

    p = subprocess.check_output(["PowerShell.exe", "-Executionpolicy", "byPass", "-File", filepath, "-Query", query])
    queryResult = p.decode("ASCII")

    print(queryResult)
    
    lines = queryResult.split("\r\n")
    lines = [l for l in lines if l != '']
    lines.pop(1)
    columns = [x for x in lines[0].split(' ') if x.isalpha()]
    columndict = {}
    for c in columns:
        columndict[c] = []
    
    for row in lines[1:]:
        while "  " in row:
            row = row.replace("  ", " ")
        values = row.split(" ", len(columns) -1 )

        for i in range(len(columns)):
            columndict[columns[i]].append(values[i])
            
    return columndict
    

def create_folder(filepath = "root/backend/scripts/creating_folder.ps1", storage_path = "Arts/11111"):
    
    """ Storage folder structure is {SubjectName}/{StudID}.
        (Note in storage_path, seperators are "/" instead of "\\" that are in filepath). Examples:

        Create new class:                      storage_path = "class8005"
        Create new student in class 8005:      storage_path = class8005/11112
    """
    
    import sys, subprocess

    subprocess.check_output(["PowerShell.exe", "-Executionpolicy", "byPass", "-File", filepath, "-sourceFilePath", storage_path])
    

def uploading_assignment(filepath = "root/backend/scripts/uploading_assignment_to_storage.ps1", textfilepath = "root/backend/assignment.txt", subject_name = "Arts", studentID = "11111", assignmentID = "100"):

    """ Uploads a textfile to storage. Takes in:
        text file path (to be uploaded) and uploads it to storage with targetpath of
        {subjectName}/{studentID}/{assignmentID}.
        txt"""

    import sys, subprocess
    
    subprocess.check_output(["PowerShell.exe", "-Executionpolicy", "byPass", "-File", filepath,
                             "-subjectName", subject_name,
                             "-studentID", str(studentID),
                             "-assignmentID", str(assignmentID),
                             "-textFilePath", textfilepath])

def downloading_past_assignment(filepath = "root/backend/scripts/downloading_assignment.ps1", download_file_path = "root/backend/scripts/new.txt" , subject_name = "Arts", studentID = "11111", assignmentID = "100"):

    """ Downloads the assignment from storage account to download_file_path
        Note: download_file_path needs to end with ".txt" (It is where you want it downloaded and by what name)
    """
    
    import sys, subprocess

    subprocess.check_output(["PowerShell.exe", "-Executionpolicy", "byPass", "-File", filepath,
                             "-subjectName", subject_name,
                             "-studentID", str(studentID),
                             "-assignmentID", str(assignmentID),
                             "-downloadFilePath", download_file_path])
