import { NextFunction, Request, Response } from 'express'
import TaskModel from '../models/TaskModel'
import TaskService from '../services/TaskService'

class TaskController {
    private taskService : TaskService

    constructor(){
        this.taskService = new TaskService()
    }


    async get(req: Request, res: Response, next: NextFunction) : Promise<Response | undefined> {
        try{
            const reqId : Number = +req.params.id

            const task : TaskModel = await this.taskService.findById(reqId)

            if(!task)
                return res.sendStatus(404)

            return res.status(200).send(task)
        }catch(err){
            next(err)
        }
    }

    async list(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try{
            const tasks : Array<TaskModel> = await this.taskService.findAll()
            res.status(200).send(tasks)
        }catch(err){
            next(err)
        }
    }

    async add(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try{
            const task = await this.taskService.add(req.body)
            res.status(201).send(task)
        }catch(err){
            next(err)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try{
            const taskId = +req.params.id
            const task = await this.taskService.deleteById(taskId)
            res.status(200).send(task)
        }catch(err){
            next(err)
        }
    }

    async set(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try{
            const taskId: Number = +req.params.id 
            const currentTask = await this.taskService.findById(taskId)
            
            currentTask.text = req.body.text
            currentTask.day = req.body.day
            currentTask.reminder = req.body.reminder

            const updatedTask = await this.taskService.set(currentTask)

            res.status(200).send(updatedTask)
        }catch(err){
            next(err)
        }
    }
}

export default new TaskController()