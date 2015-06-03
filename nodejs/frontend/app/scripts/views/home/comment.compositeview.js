define(function(require) {
  'use strict';

  var Marionette = require('marionette'),
      CommentItemView = require('views/home/comment.itemview'),
      commentTpl = require('hbs!templates/home/comment.compositeview'),
      CommentCollection = require('collections/comment.collection'),
      CommentModel = require('models/comment.model'),
      currentUser = require('helper/auth.singleton').getInstance();

  var CommentCompositeView = Marionette.CompositeView.extend({
    template: commentTpl,
    childView: CommentItemView,
    childViewContainer: '.content-body',
    className: 'comment-content',

    events: {
      'keyup #commentContent' : 'onComment'
    },

    ui: {
      'commentInput': '#commentContent'
    },

    initialize: function(options) {
      var dataUser = currentUser.toJSON();

      this.userName = [dataUser.firstname, dataUser.lastname].join(' ');

      this.articleId = options.articleId;
      this.userId = dataUser._id;

      this.collection = new CommentCollection();
      this.collection.fetch({
        articleId: this.articleId,
        success: function(collection, res) {
          console.log('fetch success', res);
        }
      });
    },

    childViewOptions: function() {
      return {
        articleId: this.articleId
      };
    },

    onComment: function(e) {
      var self = this;

      this.commentModel = new CommentModel();

      if(e.keyCode === 13) {
        console.log('enter');
        var value = this.ui.commentInput.val();
        this.commentModel.set('commentContent', value);
        this.commentModel.set('articleId', this.articleId);
        this.commentModel.set('userId', this.userId);
        this.commentModel.set('userName', this.userName);

        this.commentModel.save(null, {
          success: function(model, res) {
            self.commentModel.set('myself', true);
            self.commentModel.set('editMode', false);
            self.collection.add(self.commentModel);
            self.ui.commentInput.val('');

          }
        });
      }
    }
  });
  return CommentCompositeView;
});
