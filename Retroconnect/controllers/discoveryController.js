const Post = require('../config/model/post');
const mongoose = require('mongoose');

const submitComplaint = async (req, res) => {
  try {
    const { title, description, category, location, userId } = req.body || {};

    if (!title || !location) {
      return res.status(400).json({ message: 'title and location are required' });
    }

    const toCreate = {
      title,
      content: description,
      author: userId,
      category,
      location
    };

    const savedPost = await Post.create(toCreate);

    const similarPosts = await Post.find({
      _id: { $ne: savedPost._id },
      $or: [
        location ? { location } : null,
        category ? { category } : null
      ].filter(Boolean)
    }).limit(5);

    return res.status(201).json({
      message: 'Complaint submitted successfully',
      complaint: savedPost,
      relatedIssues: similarPosts
    });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};

const discoverLocal = async (req, res) => {
  try {
    const { location, category } = req.query || {};

    const orFilters = [];
    if (location) orFilters.push({ location });
    if (category) orFilters.push({ category });

    if (orFilters.length === 0) {
      return res.status(400).json({ message: 'Provide location or category' });
    }

    const posts = await Post.find({ $or: orFilters });

    if (!posts || posts.length === 0) {
      return res.json({ message: 'No local issues found', results: [] });
    }

    return res.json({ results: posts });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};

module.exports = { submitComplaint, discoverLocal };

// Discover similar by keyword (text search) or category
const discoverSimilar = async (req, res) => {
  try {
    const { q, category } = req.query || {};

    // Build filter: text search if q provided, category match optional
    const filter = {};
    if (q && q.trim()) {
      filter.$text = { $search: q.trim() };
    }
    if (category && category.trim()) {
      filter.category = category.trim();
    }

    if (!filter.$text && !filter.category) {
      return res.status(400).json({ message: 'Provide q (keyword) or category' });
    }

    // Project textScore when using $text to sort by relevance
    const projection = filter.$text ? { score: { $meta: 'textScore' } } : undefined;
    const sort = filter.$text ? { score: { $meta: 'textScore' } } : { createdAt: -1 };

    const matches = await Post.find(filter, projection).sort(sort).limit(20);

    return res.json({ results: matches });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};

module.exports.discoverSimilar = discoverSimilar;

// Get recent complaints for a user (sorted newest first)
const getUserComplaints = async (req, res) => {
  try {
    const { userId, limit } = req.query || {};
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId format' });
    }

    const max = Math.min(parseInt(limit, 10) || 20, 100);
    const complaints = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .limit(max);

    return res.json({ results: complaints });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};

module.exports.getUserComplaints = getUserComplaints;

// Get all complaints across users (optionally paginated)
const getAllComplaints = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
    const skip = (page - 1) * limit;

    const [results, total] = await Promise.all([
      Post.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Post.countDocuments({})
    ]);

    return res.json({
      results,
      page,
      limit,
      total,
      hasMore: skip + results.length < total
    });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Server error' });
  }
};

module.exports.getAllComplaints = getAllComplaints;

