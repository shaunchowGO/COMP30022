# PowerShell script for creating a new SQL user called myapp using application AppSP with secret
# AppSP is part of an Azure AD admin for the Azure SQL server below

# Download latest  MSAL  - https://www.powershellgallery.com/packages/MSAL.PS
Import-Module MSAL.PS

$tenantId = "6e845553-113b-458c-87d1-8fd4b350fdf6"   # tenantID (Azure Directory ID) were AppSP resides
$clientId = "44faa1af-7b88-4ba9-a672-20b8081a0692"   # AppID also ClientID for AppSP     
$clientSecret = "-sf8Q~WGd1oG4ISH21ImqFX0HnYBohAO2tGnsb4A"   # Client secret for AppSP 
$scopes = "https://database.windows.net/.default" # The end-point

$result = Get-MsalToken -RedirectUri $uri -ClientId $clientId -ClientSecret (ConvertTo-SecureString $clientSecret -AsPlainText -Force) -TenantId $tenantId -Scopes $scopes

$Tok = $result.AccessToken
#Write-host "token"
$Tok

$SQLServerName = "sql-server-capstone-project"    # Azure SQL logical server name 
$DatabaseName = "sql-db-capstone-project"     # Azure SQL database name

Write-Host "Create SQL connection string"
$conn = New-Object System.Data.SqlClient.SQLConnection 
$conn.ConnectionString = "Data Source=$SQLServerName.database.windows.net;Initial Catalog=$DatabaseName;Connect Timeout=30"
$conn.AccessToken = $Tok

Write-host "Connect to database and execute SQL script"
$conn.Open() 
$ddlstmt = 'CREATE USER [SP2_SQL] FROM EXTERNAL PROVIDER;'
Write-host " "
Write-host "SQL DDL command"
$ddlstmt
$command = New-Object -TypeName System.Data.SqlClient.SqlCommand($ddlstmt, $conn)       

Write-host "results"
$command.ExecuteNonQuery()
$conn.Close()