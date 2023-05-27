import { Router } from 'express'
import checkAuth from '../utils/checkAuth.js'

import {
  getUserPosts,
  remove,
  getOne,
  create,
  update,
} from '../controllers/PostController.js'
import { postCreateValidation } from '../validations.js'
import handleValidationErrors from '../utils/handleValidationErrors.js'

const router = Router()

router.get('/:id', getOne)
router.get('/all/:userId', checkAuth, getUserPosts)

router.post(
  '/',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  create
)

router.delete('/:id', checkAuth, remove)

router.patch(
  '/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  update
)

export default router
