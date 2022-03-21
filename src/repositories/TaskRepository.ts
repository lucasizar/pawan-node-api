import DbContext from "./DbContext"
import TaskModel from "../models/TaskModel"

export default class TaskRepository extends DbContext {

    public async findById(id: Number) : Promise<TaskModel>{
        const request = await this.getRequest()
    
        request.input("Id", this.sqlInstance.Int, id)

        const query = `
            Select Id as id,
                TaskText as text,
                TaskDay as day,
                Reminder as reminder
            From
                Task
            Where
                Id = @Id
        `

        const result = await request.query(query)
        const task = result.recordset[0]

        return task
    }

    public async findAll() : Promise<Array<TaskModel>> {
        const request = await this.getRequest()
        const query = `
            Select Id as id,
                TaskText as text,
                TaskDay as day,
                Reminder as reminder
            From
                Task
            Order By 
                Id Desc
        `

        const result = await request.query(query)
        const tasks = result.recordset
        
        return tasks
    }

    public async add(task : TaskModel) : Promise<TaskModel> {
        const request = await this.getRequest()

        request.input('TaskText', this.sqlInstance.VarChar(255), task.text)
        request.input('TaskDay', this.sqlInstance.VarChar(255), task.day)
        request.input('Reminder', this.sqlInstance.Bit, task.reminder)

        const query = `
            Insert Into
                Task (TaskText, TaskDay, Reminder)
            Output
                Inserted.Id As id,
                Inserted.TaskText as text,
                Inserted.TaskDay as day,
                Inserted.Reminder as reminder
            Values(@TaskText, @TaskDay, @Reminder)
        `
        const result = await request.query(query)

        const insertedTask = result.recordset[0]
        
        return insertedTask
    }

    public async update(task : TaskModel) : Promise<TaskModel> {
        const request = await this.getRequest()

        request.input('Id', this.sqlInstance.Int, task.id)
        request.input('TaskText', this.sqlInstance.VarChar(255), task.text)
        request.input('TaskDay', this.sqlInstance.VarChar(255), task.day)
        request.input('Reminder', this.sqlInstance.Bit, task.reminder)

        const query = `
            Update
                Task
            Set
                TaskText = @TaskText,
                TaskDay = @TaskDay,
                Reminder = @Reminder
            Output
                Inserted.Id As id,
                Inserted.TaskText as text,
                Inserted.TaskDay as day,
                Inserted.Reminder as reminder
            Where
                Id = @Id
        `
        const result = await request.query(query)

        const insertedTask = result.recordset[0]
        
        return insertedTask
    }

    public async deleteById(id : number) : Promise<TaskModel> {
        const request = await this.getRequest()

        request.input('Id', this.sqlInstance.Int, id)
      
        const query = `
            Delete From
                Task
            Output
                Deleted.Id As id,
                Deleted.TaskText as text,
                Deleted.TaskDay as day,
                Deleted.Reminder as reminder
            Where
                Id = @Id
        `
        const result = await request.query(query)

        const deletedTask = result.recordset[0]
        
        return deletedTask
    }
}