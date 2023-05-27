import { Router } from 'express'
import checkAuth from '../utils/checkAuth.js'

import { getMe, login, register } from '../controllers/AuthController.js'
import { loginValidation, registerValidation } from '../validations.js'
import handleValidationErrors from '../utils/handleValidationErrors.js'

const router = Router()
router.post('/login', loginValidation, handleValidationErrors, login)
router.post('/register', registerValidation, handleValidationErrors, register)
router.get('/me', checkAuth, getMe)

export default router
