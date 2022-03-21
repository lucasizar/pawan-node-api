import { Router } from 'express'
import TaskController from '../controllers/TaskController'

const router = Router()

router.get('/', TaskController.list.bind(TaskController))
router.get('/:id', TaskController.get.bind(TaskController))
router.put('/:id', TaskController.set.bind(TaskController))
router.delete('/:id', TaskController.delete.bind(TaskController))
router.post('/', TaskController.add.bind(TaskController))

export default router


