const mongoose = require('mongoose')
const dotenv = require('dotenv')
const logger = require('./utils/logger')
// const config = require('./utils/config')

dotenv.config({ path: './config.env' })

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...')
  console.log(err.name, err.message)
  process.exit(1)
})

const app = require('./app')

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {})
  .then(() => logger.info('DB connection successful'))

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  logger.info(`App running on port ${port}`)
})

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully')
  server.close(() => {
    console.log('💥 Process terminated!')
  })
})
