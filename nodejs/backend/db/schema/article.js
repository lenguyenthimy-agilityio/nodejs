'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongoosePaginate = require('mongoose-paginate');

/**
 * new article schema
 */
var ArticleSchema = new Schema({
  userId: String,
  userName: String,
  title: String,
  content: String,
  imageUrl: String
},{
  collection: 'Article'
});

/**
 * Using mongoose paginate
 */
ArticleSchema.plugin(mongoosePaginate);

var articleModel = mongoose.model('Article', ArticleSchema);

/**
 * Expose
 */
module.exports = articleModel;
