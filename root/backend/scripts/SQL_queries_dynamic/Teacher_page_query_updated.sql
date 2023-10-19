SELECT s.Name as [Subject], s.id as [ID], count(distinct a.Id) as [Assignment Count], count(distinct sc.StudentId) as [Student Count] FROM dbo.AcademicsCohort AS ac
inner join dbo.Subject AS s
on s.Id = ac.SubjectId
left join dbo.Assignment as a
on a.SubjectId = s.Id
left join dbo.StudentsCohort as sc
on sc.SubjectId = s.Id
where
ac.AcademicId = ?
group by s.id, s.name
