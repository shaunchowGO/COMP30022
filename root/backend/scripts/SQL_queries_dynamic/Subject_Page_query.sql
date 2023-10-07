SELECT TOP (1000) [Id]
      ,[DueDate]
      ,[StartDate]
  FROM [dbo].[Assignment]

Where SubjectId = REPLACE_WITH_SUBJECT_ID
