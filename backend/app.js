const express = require('express');

const tenantsRouter = require('./routes/tenantRoutes');

const cors = require('cors');

const userRouter = require('./routes/userRoutes');

const isAuth = require('./middlewares/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log('Hello from the middleware 👋');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/tenants', isAuth, tenantsRouter);
app.use('/api/users', userRouter);

// 4) ERRORS
app.use((error, req, res, next) => {
  console.log('Error :', error.toString());
  const status = error.status || 400;
  return res.status(status).json({
    message: error.toString(),
  });
});

module.exports = app;


