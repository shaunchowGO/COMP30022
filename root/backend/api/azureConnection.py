import subprocess

# Path to the PowerShell script
powershell_script_path = '../scripts/Query_SQL_SPrincipal.ps1'

try:
    result = subprocess.run(['powershell.exe', '-File', powershell_script_path], capture_output=True, text=True, check=True)
    
    if result.returncode == 0:
        
        script_output = result.stdout
        
        print("PowerShell Script Output:")
        print(script_output)
    else:
        print("PowerShell script returned an error.")
except subprocess.CalledProcessError as e:
    print("Error executing PowerShell script:", e)
