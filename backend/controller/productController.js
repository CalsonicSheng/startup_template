import ProductCollection from '../models/productModel.js';
import productErrorHandler from '../error/productErrorHandler.js';

export async function getAllProducts(req, res, next) {
  try {
    const allProduct = await ProductCollection.find();
    res.status(200).json(allProduct);
  } catch {
    const customErrorObj = productErrorHandler('Can not fetch items, something went wrong from our end. Please try again later');
    next(customErrorObj);
  }
}

//----------------------------------------------------------------------------------------------------------------------------------------------

export async function getSelectedProduct(req, res, next) {
  const selectedProductId = req.params.id;
  try {
    const selectedProduct = await ProductCollection.findById(selectedProductId);
    res.status(200).json(selectedProduct);
  } catch (error) {
    const customErrorObj = productErrorHandler('We could not find the item you requested, please check again');
    next(customErrorObj);
  }
}
