const Message = require('../models/messageModel')

exports.createMessage = async (req, res) => {
  try {
    let { name, subject, content, isRead, sentDates } = req.body
    // const newTour = await Tour.create(req.body)
    const newMessage = await Message.create({
      name,
      subject,
      content,
      isRead,
      sentDates,
    })

    res.status(201).json({
      status: 'success',
      data: {
        message: newMessage,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: next(err),
    })
  }
}

exports.getMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)

    res.status(200).json({
      status: 'success',
      data: {
        message,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: next(err),
    })
  }
}

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({})

    res.status(200).json({
      status: 'success',
      results: messages.length,
      data: {
        messages,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: next(err),
    })
  }
}

exports.updateMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      status: 'success',
      data: {
        message,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: next(err),
    })
  }
}

exports.deleteTour = async (req, res, next) => {
  'use strict'
  try {
    const tour = await Message.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'success',
      data: null,
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: next(err),
    })
  }
}
