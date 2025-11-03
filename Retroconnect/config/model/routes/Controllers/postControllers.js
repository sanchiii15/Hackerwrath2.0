const Post = require('../../post');

const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({ message: 'title, content, author are required' });
    }
    const post = await Post.create({ title, content, author });
    return res.status(201).json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name email');
    return res.json(posts);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    return res.json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: { title, content } },
      { new: true, runValidators: true }
    );
    if (!post) return res.status(404).json({ message: 'Post not found' });
    return res.json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    return res.json({ message: 'Post deleted' });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };


