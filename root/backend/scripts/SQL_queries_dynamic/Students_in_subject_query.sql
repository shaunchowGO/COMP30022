select S.[Id], S.[Name] from [dbo].[Student] as S
inner join [dbo].[StudentsCohort] as SC
on S.Id = SC.StudentId
where SC.SubjectId = REPLACE_WITH_SUBJECT_ID