define(function(require) {
  'use strict';

  var Marionette = require('marionette'),
      articleTpl = require('hbs!templates/home/article.itemview'),
      CommentCompositeView = require('views/home/comment.compositeview');

  var ArticleItemView = Marionette.ItemView.extend({

    template: articleTpl,
    //tagName: 'li',
    className: 'item-article clearfix row',

    events: {
      'click .btn-delete-article': 'onDeleteArticle',
      'click .btn-edit-article': 'onEditArticle',
      'keyup input[name=title]': 'onSaveEditArticle',
      'keyup input[name=content]': 'onSaveEditArticle',
      'click .btn-cancel': 'onCancelEdit'
    },

    ui: {
      wrapComment: '.wrap-comment'
    },

    bindings: {
      'input[name=title]': 'title',
      'input[name=content]': 'content'
    },

    initialize: function() {
      this.commentCompositeView = new CommentCompositeView({
        articleId: this.model.id
      });
    },

    onRender: function() {
      this.stickit();
      this.ui.wrapComment.append(this.commentCompositeView.render().$el);
    },

    onDeleteArticle: function(e) {
      this.model.destroy({
        wait: true,
        success: function(res) {
          console.log('destroy success');
        }
      });
    },

    onEditArticle: function(e) {
      this.model.set('editMode', true);
      this.render();
    },

    onSaveEditArticle: function(e) {
      var self = this;
      if(e.keyCode === 13) {
        this.model.save(null, {
          success: function() {
            console.log('save success');
            self.model.set('editMode', false);
            self.render();
          }
        });
      }
    },

    onCancelEdit: function() {
      this.model.set('editMode', false);
      this.render();
    }
  });
  return ArticleItemView;
});
