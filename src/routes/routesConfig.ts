import { Router } from 'express'
import taskRoute from './taskRoute'

const router = Router()

router.use('/tasks', taskRoute)

export default router

