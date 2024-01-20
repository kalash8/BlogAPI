const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController.js');


router.get('/', recipeController.homepage);
router.get('/categories', recipeController.exploreCategories);

module.exports = router;