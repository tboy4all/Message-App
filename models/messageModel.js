const mongoose = require('mongoose')
// const slugify = require('slugify')
// const validator = require('validator');

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, 'name is Required'],
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
      // required: [true, 'Subject is Required'],
    },
    content: {
      type: String,
      trim: true,
      // required: [true, 'Subject is Required'],
    },

    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    // sentDates: [Date],
    sentDates: {
      type: String,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// messageSchema.virtual('durationWeeks').get(function () {
//   return this.duration / 7
// })

messageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
