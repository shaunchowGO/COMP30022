# Sends a Query and outputs the results using service Prinpical

$appId = "44faa1af-7b88-4ba9-a672-20b8081a0692"
$tenantId = "6e845553-113b-458c-87d1-8fd4b350fdf6"
$password = "-sf8Q~WGd1oG4ISH21ImqFX0HnYBohAO2tGnsb4A"
$secpasswd = ConvertTo-SecureString $password -AsPlainText -Force
$mycreds = New-Object System.Management.Automation.PSCredential ($appId, $secpasswd)
$SQLServerName = "sql-server-capstone-project"    # Azure SQL logical server name 
$DatabaseName = "sql-db-capstone-project"     # Azure SQL database name
$ConnectionString="Data Source=$SQLServerName.database.windows.net; Initial Catalog=$DatabaseName;"

$Query="SELECT * FROM [dbo].[test]"
 
Connect-AzAccount -ServicePrincipal -Credential $mycreds -Tenant $tenantId
    #get token
    $context =Get-AzContext
    $dexResourceUrl='https://database.windows.net/'
    $token = [Microsoft.Azure.Commands.Common.Authentication.AzureSession]::Instance.AuthenticationFactory.Authenticate($context.Account, 
                                    $context.Environment, 
                                    $context.Tenant.Id.ToString(),
                                    $null, 
                                    [Microsoft.Azure.Commands.Common.Authentication.ShowDialog]::Never, 
                                    $null, $dexResourceUrl).AccessToken
    $SqlConnection = New-Object System.Data.SqlClient.SqlConnection                
    $SqlCmd = New-Object System.Data.SqlClient.SqlCommand
    try 
    {
        $SqlConnection.ConnectionString = $ConnectionString
        if ($token)
        {
            $SqlConnection.AccessToken = $token
        }
        $SqlConnection.Open()
         
        $SqlCmd.Connection = $SqlConnection 
        
        $SqlCmd.CommandText = $Query
        $SqlAdapter = New-Object System.Data.SqlClient.SqlDataAdapter
        $SqlAdapter.SelectCommand = $SqlCmd
        $DataSet = New-Object System.Data.DataSet
        $SqlAdapter.Fill($DataSet)
        #Outputs query
        $DataSet.Tables
    }
    finally
    {
        $SqlAdapter.Dispose()
        $SqlCmd.Dispose()
        $SqlConnection.Dispose()
    }
Disconnect-AzAccount