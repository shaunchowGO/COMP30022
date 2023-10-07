SELECT
    S.Name AS Subject,
    S.ID AS ID,
    COUNT(DISTINCT A.ID) as [AssignmentCount], 
    COUNT(DISTINCT SC.StudentID) as [StudentCount]
FROM
    dbo.Subject S
INNER JOIN
    dbo.Assignment A ON S.ID = A.SubjectID
INNER JOIN
    dbo.AcademicsCohort AC ON S.ID = AC.SubjectId
INNER JOIN
    dbo.StudentsCohort SC ON S.ID = SC.SubjectID
WHERE
    AC.AcademicId = REPLACE_WITH_ACADEMIC_ID
GROUP BY
    S.ID