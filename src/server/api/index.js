import express from 'express'
import { CREATE_USER, AUTH_USER, UPDATE_USER } from './controllers/CUser'

const router = express.Router()

router.post('/user', CREATE_USER)
router.post('/auth', AUTH_USER)
router.put('/user', UPDATE_USER)

export default router
