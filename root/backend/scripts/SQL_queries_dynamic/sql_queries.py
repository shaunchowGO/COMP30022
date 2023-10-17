students_in_subject_query = """
SELECT S.[Id], S.[Name] FROM [dbo].[Student] as S
INNER JOIN [dbo].[StudentsCohort] as SC
on S.Id = SC.StudentId
WHERE SC.SubjectId = ?
"""

subject_page_query = """
SELECT TOP (1000) [Id],[Name], [SubjectId]
  FROM [dbo].[Assignment]

WHERE SubjectId = ?
"""

submissions_for_assignment = """
SELECT std.Name, sub.similarity_score, sub.[date] as [Date Added] FROM [dbo].Student as std
INNER JOIN [dbo].[Submission] as sub
on std.Id = sub.StudentId
WHERE sub.AssignmentId = ?
"""

submissions_for_student = """
SELECT sub.AssignmentId, s.Name as [Subject_Name], sub.Similarity_Score, [Date]  FROM [dbo].Submission as sub
INNER JOIN [dbo].[Assignment] as  A
on sub.AssignmentId = A.Id
INNER JOIN [dbo].[Subject] as s
on s.Id = A.subjectId
WHERE sub.studentId = ?
"""

teacher_page_query = """
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
    AC.AcademicId = ?
GROUP BY
    S.ID,
    S.Name
    """