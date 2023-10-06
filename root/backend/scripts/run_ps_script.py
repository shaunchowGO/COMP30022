

#NOTE ALL PATHS HAVE A DOUBLE SLASH "\\" NOT "\"

def run_query(filepath = "C:/Users/youni/Desktop/CapStoneProject/PowerShell/Query_SQL_SPrincipal.ps1", query= "SELECT * FROM [dbo].[submission]"):
    
    # Note filepath has to "\\" or "/" but not "\"
    import sys, subprocess

    p = subprocess.check_output(["PowerShell.exe", "-Executionpolicy", "byPass", "-File", filepath, "-Query", query])
    queryResult = p.decode("ASCII")
    
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
    

def create_folder(filepath, storage_path= "Arts/11111"):
    
    """ Storage folder structure is {SubjectName}/{StudID}.
        (Note in storage_path, seperators are "/" instead of "\\" that are in filepath). Examples:

        New class:                      storage_path = "class8005"
        New student in class 8005:      storage_path = class8005/11112
    """
    
    import sys, subprocess

    subprocess.check_output(["PowerShell.exe", "-Executionpolicy", "byPass", "-File", filepath, "-sourceFilePath", storage_path])
    

def uploading_assignment(filepath, textfilepath, subject_name = "Arts", studentID = "11111", assignmentID = "100"):

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

def downloading_past_assignment(filepath, download_file_path = "temp.txt" , subject_name = "Arts", studentID = "11111", assignmentID = "100"):

    """ Downloads the assignment from storage account to download_file_path
        Note: download_file_path needs to end with ".tzt"
    """
    
    import sys, subprocess

    subprocess.check_output(["PowerShell.exe", "-Executionpolicy", "byPass", "-File", filepath,
                             "-subjectName", subject_name,
                             "-studentID", str(studentID),
                             "-assignmentID", str(assignmentID),
                             "-downloadFilePath", download_file_path])
