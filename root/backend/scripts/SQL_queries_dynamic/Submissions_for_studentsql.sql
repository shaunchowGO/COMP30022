select sub.AssignmentId, s.Name as [Subject Name], sub.Similarity_Score, [Date]  from [dbo].Submission as sub
inner join [dbo].[Assignment] as  A
on sub.AssignmentId = A.Id
inner join [dbo].[Subject] as s
on s.Id = A.subjectId
where sub.studentId = REPLACE_WITH_STUDENT_ID