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
SELECT std.Name, sub.similarity_score, sub.[date] as [DateAdded] FROM [dbo].Student as std
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
SELECT s.Name as [Subject], s.id as [ID], count(distinct a.Id) as [AssignmentCount], count(distinct sc.StudentId) as [StudentCount] FROM dbo.AcademicsCohort AS ac
inner join dbo.Subject AS s
on s.Id = ac.SubjectId
left join dbo.Assignment as a
on a.SubjectId = s.Id
left join dbo.StudentsCohort as sc
on sc.SubjectId = s.Id
where
ac.AcademicId = ?
group by s.id, s.name
    """
