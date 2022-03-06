// this is to mainly handle the 500-level error code
// all product error handler is to only handle the SINGLE ASYNC operation conducted in the productController | very easy to handle a single source of TYPE error with just 1 case
function productErrorHandler(customMessage) {
  return { customErrorMessage: customMessage };
}

export default productErrorHandler;
