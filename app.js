const path = require('path')
const express = require('express')
const morgan = require('morgan')
// const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
// const hpp = require('hpp')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const compression = require('compression')

const messageRouter = require('./routes/messageRoutes')
const userRouter = require('./routes/userRouter')
// const middleware = require('./utils/middleware')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

// Start express App
const app = express()
// app.enable('trust proxy')

//   GLOBAL MIDDLEWARE
// Implement CORS
app.use(cors())

app.options('*', cors())

app.use(express.static(path.join(__dirname, 'public')))

// app.use(
//   helmet({
//     crossOriginEmbedderPolicy: false,
//     crossOriginResourcePolicy: {
//       allowOrigins: ['*'],
//     },
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ['*'],
//         scriptSrc: ["* data: 'unsafe-eval' 'unsafe-inline' blob:"],
//       },
//     },
//   })
// )

app.use(helmet())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Limit requests from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, Please try again in an hour:',
// })
// app.use('/api', limiter)

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser())

// Data sanitization against NOSQL query injection
app.use(mongoSanitize())

// Data sanitization against XSS
// app.use(xss())

app.use(compression())

// Test middleware
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString()
//   // console.log(req.cookies);
//   next()
// })

// app.use(middleware.unknownEndpoint)
// app.use(middleware.errorHandler)

app.use('/api/v1/messages', messageRouter)
app.use('/api/v1/users', userRouter)

// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
// })

app.use(globalErrorHandler)

// START SERVER
module.exports = app
