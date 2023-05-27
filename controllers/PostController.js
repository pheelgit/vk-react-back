import PostModel from '../models/Post.js'
import UserModel from '../models/User.js'

// Get All Posts
export const getUserPosts = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId)

    const list = await Promise.all(
      user.posts.map(post => {
        return PostModel.findById(post._id)
      })
    )
    res.json(list.reverse())
  } catch (error) {
    res.json({ message: 'Что-то пошло не так.' })
  }
}

export const remove = async (req, res) => {
  try {
    const postId = req.params.id

    const deletedPost = await PostModel.findOneAndDelete({
      _id: postId,
    })

    if (!deletedPost) {
      return res.status(404).json({
        message: 'удаляемый пост не найден',
      })
    }

    await UserModel.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id },
    })

    return res.status(200).json(deletedPost)
  } catch (err) {
    return res.status(400).json({
      message: 'ошибка при удалении поста',
    })
  }
}

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id
    const post = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },

      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      }
    )
    if (!post) {
      return res.status(404).json({
        message: 'пост не найден',
      })
    }

    return res.status(200).json(post)
  } catch (err) {
    return res.status(400).json({
      message: 'ошибка при загрузке поста',
    })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    })

    const post = await doc.save()

    await UserModel.findByIdAndUpdate(req.userId, {
      $push: { posts: post },
    })
    console.log('запощен', req.body.title, req.body.text)
    res.json(post)
  } catch (err) {
    res.status(500).json({ message: 'Не удалось создать пост' })
  }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id
    await PostModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    )
    res.status(200).json({
      message: 'обновление успешно',
    })
  } catch (err) {
    res.status(500).json({ message: 'Не удалось обновить пост' })
  }
}
