import pyodbc
submissions_for_student = """
SELECT sub.AssignmentId, s.Name as [Subject Name], sub.Similarity_Score, [Date]  FROM [dbo].Submission as sub
INNER JOIN [dbo].[Assignment] as  A
on sub.AssignmentId = A.Id
INNER JOIN [dbo].[Subject] as s
on s.Id = A.subjectId
WHERE sub.studentId = ?
"""

# call this function to run a query to the database
# data returned still needs to be formatted to according to SQL column names
def run_sql_query(query, params=None):
                
    # Azure SQL Database connection details
    server = "sql-server-capstone-project.database.windows.net"
    database = "sql-db-capstone-project"
    clientId = "44faa1af-7b88-4ba9-a672-20b8081a0692"  
    clientSecret = "-sf8Q~WGd1oG4ISH21ImqFX0HnYBohAO2tGnsb4A" 
    tenantId = "6e845553-113b-458c-87d1-8fd4b350fdf6"  


    connection_string = f"Driver={{ODBC Driver 17 for SQL Server}};Server={server};Database={database};Authentication=ActiveDirectoryServicePrincipal;UID={clientId};PWD={clientSecret};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"

    try:
    
        conn = pyodbc.connect(connection_string)

        cursor = conn.cursor()

        if params is not None:
            cursor.execute(query, params)
            conn.commit()
        else:
            cursor.execute(query)
            
            rows = cursor.fetchall()
            column_names = [column[0] for column in cursor.description]

            cursor.close()
            conn.close()
    
            # print("Column Names: ", column_names)
            # for row in rows:
            #     print(row)
            return rows

        cursor.close()
        conn.close()   

        

      

       
    except Exception as e:
        print(f"Error: {str(e)}")

        
 


submissions_for_student = """
SELECT sub.AssignmentId, s.Name as [Subject_Name], sub.Similarity_Score, [Date]  FROM [dbo].Submission as sub
INNER JOIN [dbo].[Assignment] as  A
on sub.AssignmentId = A.Id
INNER JOIN [dbo].[Subject] as s
on s.Id = A.subjectId
WHERE sub.studentId = 11111
"""

# q = "SELECT * FROM [dbo].[StudentsCohort] AS sc INNER JOIN [dbo].[Student] AS s ON s.id = sc.StudentId WHERE sc.subjectId = 8001"

q = "SELECT TOP 1 * FROM [dbo].[student] WHERE Id = 11111"

# run_sql_query('SELECT * FROM [dbo].[assignment]')
run_sql_query(q)
