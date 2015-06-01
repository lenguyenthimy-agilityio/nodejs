'use strict';
var express = require('express'),
    router = express.Router(),
    articleController = require('../controllers/article'),
    checkAuthen = require('./check-authen');

/**
 * Post one article
 * Need check ligin first
 */
router.post('/', checkAuthen, articleController.postArticle);

/**
 * Upload image
 * Need check login first
 */
router.post('/upload', checkAuthen, function(req, res) {
  res.send(req.files);
});

/**
 * Get all artcle
 * Need check login first
 */
router.get('/', checkAuthen, articleController.getListArticle);

/**
 * Delete one article
 */
router.delete('/:articleId', checkAuthen, articleController.deleteArticle);

/**
 * Edit article
 */
router.put('/:articleId', checkAuthen, articleController.editArticle);

/**
 * Expose
 */
module.exports = router;
