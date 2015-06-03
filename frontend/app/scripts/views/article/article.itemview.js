define(function(require) {
  'use strict';
  var Marionette = require('marionette'),
      articleTpl = require('hbs!templates/article/article.itemview'),
      ArticleModel = require('models/article.model'),
      currentUser = require('helper/auth.singleton').getInstance();

  require('jquery.fileupload');

  var ArticleItemView = Marionette.ItemView.extend({

    template: articleTpl,

    bindings: {
      '#title': 'title',
      '#content': 'content'
    },

    events: {
      'click .btn-save' : 'onSaveArticle'
    },


    initialize: function() {

      this.model = new ArticleModel();

      var dataUser = currentUser.toJSON(),
          firstname = dataUser.firstname,
          lastname = dataUser.lastname;

      this.userName = [firstname, lastname].join(' ');

      this.model.set('userName', this.userName);
      if (currentUser) {
        this.userId = dataUser._id;
      }
    },

    onRender: function() {
      var self = this;
      this.stickit();
      this.$('#inputUpload').fileupload({
        dataType: 'json',
        url: '/api/articles/upload',
        done: function (e, data){
          console.log(data.result.file);
          self.file = data.result.file.name;
        }
      });
    },

    onSaveArticle: function(e) {
      var self = this;

      e.preventDefault();
      this.model.save(null, {
        userId: self.userId,
        fileImage: self.file,
        userName: self.userName,
        success: function(model, res) {
          console.log(res);
          Backbone.history.navigate('', {trigger: true});
        }
      });
    }

  });
  return ArticleItemView;
});
