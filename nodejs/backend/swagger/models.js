exports.models = {
  'Users': {
    'id': 'Users',
    'required': ['email'],
    'properties': {
      'firstname': {
        'type': 'string'
      },

      'lastname': {
        'type': 'string'
      },

      'email' : {
        'type': 'string'
      },

      'password': {
        'type': 'string'
      },

      'verified': {
        'type': 'boolean'
      }
    }
  },

  'Articles': {
    'id': 'Articles',
    'required': ['userId'],
    'properties': {
      'userId': {
        'type': 'string'
      },
      'userName': {
        'type': 'string'
      },
      'title': {
        'type': 'string'
      },
      'content': {
        'type': 'string'
      },
      'imageUrl': {
        'type': 'string'
      }
    }
  },

  'Comments': {
    'id': 'Comments',
    'required': ['articleId'],
    'properties': {
      'articleId': {
        'type': 'string'
      },
      'userId': {
        'type': 'string'
      },
      'userName': {
        'type': 'string'
      },
      'commentContent': {
        'type': 'string'
      }
    }
  }
};
