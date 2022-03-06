import express from 'express';
import runbackendConfig from './config/backendConfig.js';
import productRouter from './routes/productRouter.js';
import runAllGlobalMiddleware from './middleware/globalMiddleware.js';
import authRouter from './routes/userRouter.js';
import checkoutRouter from './routes/checkoutRouter.js';

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// run all the configuration and global middleware for backend development (connect to database server, and make backend server actively listen for request)
const app = express();
runbackendConfig(app);
runAllGlobalMiddleware(app, express);

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// managing all auth-related routes
app.use('/user', authRouter);

// managing all the product-related routes (including home page landing)
app.use('/product', productRouter);

app.use('/checkout', checkoutRouter);

//--------------------------------------------------------------------------------------------------------------------------------------------------------

// create 404 error if express flow eventually ends up here
app.use(function (req, res, next) {
  console.log('404 error detected, no matching route');
  const error = new Error();
  error.status = 404;
  error.customErrorMessage = 'The resources you request may not exist, please navigate to other services we provide';
  error.detailErrorMessage = '404 not found';
  next(error);
});

// this is the final step to handle both 404 (only) and only all 500 level related backend server process error
app.use(function (err, req, res, next) {
  if (err.status === undefined) {
    res.status(500).json(err);
  } else {
    res.status(404).json(err);
  }
});
