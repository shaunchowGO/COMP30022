def run_ps_script(filepath, query= "SELECT * FROM [dbo].[submission]"):
    
    # Note filepath has to "\\" or "/" but not "\"
    import sys, subprocess
   
    # fixed_path = filepath.replace("\\","\\\\")
    fixed_path = filepath
    
    p = subprocess.check_output(["PowerShell.exe", "-Executionpolicy", "byPass", "-File", fixed_path, "-Query", query])
    a = p.decode("ASCII")

    return a

def clean_output(queryResult):
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

r = run_ps_script("C:\\Users\\youni\\Desktop\\CapStoneProject\\PowerShell\\Query_SQL_SPrincipal.ps1")
print(clean_output(r))
