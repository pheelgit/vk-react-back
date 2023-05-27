import UserModel from '../models/User.js'

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id)
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден( getUser)',
      })
    }
    const { passwordHash, ...userData } = user._doc

    res.json({ ...userData })
  } catch (err) {
    res.status(500).json({ message: 'Нет доступа' })
  }
}
