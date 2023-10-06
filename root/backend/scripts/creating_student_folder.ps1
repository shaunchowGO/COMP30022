param (
    $sourceSubscriptionID = "05dcda3f-04cb-4057-bfbe-472610744c79" ,
    $sourceResourceGroup = "rg-capstone-project" ,
    $sourceAccountName = "storage1itproject",
    $sourceFileSystem = "test",
    $sourceFilePath = ""
)

# Local directories
$downloadDirectory = "C:\Users\youni\Desktop\CapStoneProject\PowerShell\downloads\"  # Where Excel files are downloaded to
$trimLocalDirectory = "C:\Users\youni\Desktop\CapStoneProject\PowerShell\downloads\fixed\"  # Where CSV files are uploaded from

# Log-in to the cloud
$appID = "44faa1af-7b88-4ba9-a672-20b8081a0692"
$appSecret = "-sf8Q~WGd1oG4ISH21ImqFX0HnYBohAO2tGnsb4A"
$tenantID = "6e845553-113b-458c-87d1-8fd4b350fdf6"

$Start_Timer = (Get-Date).DateTime

$secureStringPwd = $appSecret|ConvertTo-SecureString -AsPlainText -Force
$Credential = New-Object -TypeName System.Management.Automation.PSCredential -ArgumentList $appID, $secureStringPwd
 
Connect-AzAccount -ServicePrincipal -TenantId $tenantID -Credential $Credential | out-null
select-azsubscription -subscriptionid $sourceSubscriptionID | out-null
Set-AzCurrentStorageAccount -ResourceGroupName $sourceResourceGroup -AccountName $sourceAccountName | out-null

new-azdatalakegen2item -FileSystem $sourceFileSystem -path $sourceFilePath -Directory -force | out-null

