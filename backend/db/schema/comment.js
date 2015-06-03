'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * new comment schema
 */
var CommentSchema = new Schema({
  articleId: String,
  userId: String,
  userName: String,
  commentContent: String
},{
  collection: 'Comment'
});

var CommentModel = mongoose.model('Comment', CommentSchema);

/**
 * Expose
 */
module.exports = CommentModel;
