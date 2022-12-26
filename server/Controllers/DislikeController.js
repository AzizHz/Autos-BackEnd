const Post = require('../Models/Post');

module.exports = {
  async store(req, res) {
    const { userPost } = req.headers;
    const { PostId } = req.params;

    const loggedPost = await Post.findById(userPost);
    const targetPost = await Post.findById(PostId);

    if (!targetPost) {
      return res.status(400).json({ error: 'Post not exists' });
    }

    loggedPost.dislikes.push(targetPost._id);

    await loggedPost.save();

    return res.json(loggedPost);
  },
};
