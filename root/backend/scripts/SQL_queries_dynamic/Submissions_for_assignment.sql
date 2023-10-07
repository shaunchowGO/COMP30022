select std.Name, sub.similarity_score, sub.[date] as [Date Added] from [dbo].Student as std
inner join [dbo].[Submissions] as sub
on std.Id = sub.StudentId
where sub.AssignmentId = REPLACE_WITH_ASSIGNMENT_ID
