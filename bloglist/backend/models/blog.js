const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 3
  },
  author: {
    type: String,
    minlength: 3
  },
  url: {
    type: String,
    minlength: 7
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.pre('validate', function(next) {
  if (!this.url && !this.title) {
    this.invalidate('url', 'must have either URL or title', this.url)
  }
  next()
})

blogSchema.set('toJSON', {
  virtuals: true,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)