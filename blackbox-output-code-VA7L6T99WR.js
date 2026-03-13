const express = require('express');
const Product = require('../models/Product');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// Get all products with filters
router.get('/', async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      minRating,
      search,
      page = 1,
      limit = 12,
      featured,
      trending
    } = req.query;

    const query = {};

    if (category) query.category = category;
    if (featured === 'true') query.isFeatured = true;
    if (trending === 'true') query.isTrending = true;
    if (search) query.name = { $regex: search, $options: 'i' };

    if (minPrice || maxPrice) {
      query.finalPrice = {};
      if (minPrice) query.finalPrice.$gte = Number(minPrice);
      if (maxPrice) query.finalPrice.$lte = Number(maxPrice);
    }

    if (minRating) query.rating = { $gte: Number(minRating) };

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;