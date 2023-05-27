import { Router } from 'express'
import checkAuth from '../utils/checkAuth.js'

import {
  addFriend,
  removeFriend,
  getFriends,
} from '../controllers/FriendController.js'

const router = Router()

router.get('/', checkAuth, getFriends)
router.post('/:friendId', checkAuth, addFriend)
router.delete('/:friendId', checkAuth, removeFriend)

export default router
