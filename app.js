const express = require('express');
const morgan = require('morgan');

const tenantsRouter = require('./routes/tenantsRoutes'); //this is goint to be tenentsRouter
const userRouter = require('./routes/userRoutes'); //this is going to be the user also will log each signin/out

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

//add current time to the request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tenantsRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
