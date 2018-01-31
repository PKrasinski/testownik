import express from 'express'
import { CREATE_USER } from './controllers/CUser'

const router = express.Router()

router.post('/user', CREATE_USER)

export default router
