import TaskModel from "../models/TaskModel";
import TaskRepository from "../repositories/TaskRepository";


export default class TaskService {
    private taskRepository : TaskRepository

    constructor(){
        this.taskRepository = new TaskRepository()
    }

    public async findById(id: Number) : Promise<TaskModel> {
        const task = await this.taskRepository.findById(id)
        return task
    }

    public async findAll() : Promise<Array<TaskModel>> {
        const tasks = await this.taskRepository.findAll()

        return tasks
    }

    public async add(task: TaskModel) : Promise<TaskModel>{
        const insertedTask = await this.taskRepository.add(task)

        return insertedTask
    }

    public async set(task: TaskModel) : Promise<TaskModel> {
        const updatedTask = await this.taskRepository.update(task)
        return updatedTask
    }

    public async deleteById(id: number) : Promise<TaskModel> {
        const deletedTask = await this.taskRepository.deleteById(id)
        return deletedTask
    }

}

