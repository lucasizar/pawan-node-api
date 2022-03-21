If Not Exists(Select 1 From sysobjects Where OBJECT_NAME(id) = 'Task')
Begin
	Create Table Task(
		Id Int Not Null Identity(1, 1),
		TaskText VarChar(255) Not Null,
		TaskDay VarChar(255) Not Null,
		Reminder Bit Not Null,
		Constraint PK_Task_Id Primary Key (Id)
	)
End