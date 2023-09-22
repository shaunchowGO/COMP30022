def run_ps_script(filepath):
    
    # Note filepath has to "\\" or "/" but not "\"
    import sys, subprocess
   
   # fixed_path = filepath.replace("\\","\\\\")
    fixed_path = filepath
    p = subprocess.check_output("PowerShell.exe -Executionpolicy byPass -File " + fixed_path)
    a = p.decode("ASCII")
    return a

print(run_ps_script("C:\\Users\\youni\\Desktop\\CapStoneProject\\PowerShell\\hello.ps1"))

#file = "C:\\Users\\youni\\Desktop\\CapStoneProject\\PowerShell\\hello.ps1"
#print(run_ps_script(file))

