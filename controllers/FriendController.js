import UserModel from '../models/User.js'

export const removeFriend = async (req, res) => {
  try {
    // const friend = await UserModel.findById(req.params.friendId)

    const user = await UserModel.findOneAndUpdate(
      {
        _id: req.userId,
      },

      {
        $pull: { friends: req.params.friendId },
      },
      {
        returnDocument: 'after',
      }
    )

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден( getMe)',
      })
    }

    const { passwordHash, ...userData } = user._doc

    res.json({ ...userData })
  } catch (err) {
    res.status(500).json({ message: 'Нет доступа / remove friends' })
  }
}

export const addFriend = async (req, res) => {
  try {
    const friend = await UserModel.findById(req.params.friendId)

    const user = await UserModel.findOneAndUpdate(
      {
        _id: req.userId,
      },

      {
        $addToSet: { friends: friend },
      },
      {
        returnDocument: 'after',
      }
    )

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден( getMe)',
      })
    }

    const { passwordHash, ...userData } = user._doc

    res.json({ ...userData })
  } catch (err) {
    res.status(500).json({ message: 'Нет доступа / add friends' })
  }
}

export const getFriends = async (req, res) => {
  try {
    const id = req.query?.id || req.userId
    const user = await UserModel.findById(id)

    const friendsList = await Promise.all(
      user.friends.map(friend => {
        return UserModel.findById(friend._id)
      })
    )
    res.json(friendsList)
  } catch (err) {
    res.status(500).json({ message: 'Нет доступа / getAuthFriend' })
  }
}
