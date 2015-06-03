'use strict';
var express = require('express'),
    router = express.Router(),
    commentController = require('../controllers/comment'),
    checkAuthen = require('./check-authen');

/**
 * Get all comment of 1 article
 */
router.get('/:articleId', checkAuthen, commentController.getListComment);

/*
 * Post one comment
 */
router.post('/', checkAuthen, commentController.postComment);

/**
 * Update one comment
 */
router.put('/:commentId', checkAuthen, commentController.editComment);

/**
 * Delete comment
 */
router.delete('/:commentId', checkAuthen, commentController.deleteComment);

/**
 * Expose
 */
module.exports = router;
