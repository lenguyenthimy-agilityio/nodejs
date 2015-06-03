define(function(require) {
  'use strict';

  var Marionette = require('marionette'),
      commentItemTpl = require('hbs!templates/home/comment.itemview');

  var CommentItemView = Marionette.ItemView.extend({
    template: commentItemTpl,

    className: 'comment-item clearfix',

    events: {
      'click .btn-edit-comment': 'onEditComment',
      'click .btn-delete-comment': 'onDeleteComment',
      'keyup input[name="editComment"]': 'onSubmitEditComment'
    },

    bindings: {
      'input[name=editComment]': 'commentContent'
    },

    initialize:function(options) {
      this.articleId = options.articleId;
    },

    onRender: function() {
      this.stickit();
    },

    onEditComment: function() {
      this.model.set('editMode', true);
      console.log(this.model.toJSON());
      this.render();
    },

    onSubmitEditComment: function(e) {
      var self = this;

      if(e.keyCode === 13) {
        this.model.save(null, {
          success: function(){
            console.log('save success');
            self.model.set('editMode', false);
            self.render();
          }
        });
      }
    },

    onDeleteComment: function() {
      this.model.destroy();
    }
  });

  return CommentItemView;
});
