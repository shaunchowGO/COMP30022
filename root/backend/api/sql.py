import pyodbc

# call this function to run a query to the database
# data returned still needs to be formatted to according to SQL column names
def run_sql_query(query):
                
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

        cursor.execute(query)
        rows = cursor.fetchall()
        column_names = [column[0] for column in cursor.description]


        cursor.close()
        conn.close()
        # print("Column Names: ", column_names)
        # for row in rows:
        #     print(row)
        return rows

    except Exception as e:
        print(f"Error: {str(e)}")


run_sql_query('SELECT * FROM [dbo].[AcademicsCohort]')