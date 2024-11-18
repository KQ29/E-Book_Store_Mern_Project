// order.route.js

const express = require('express');
const { createAOrder, getOrderByEmail } = require('./order.controller');

const router = express.Router();

// Create order endpoint
router.post('/', createAOrder);

// Get orders by user email
router.get('/email/:email', getOrderByEmail);

module.exports = router;
