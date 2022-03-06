import express from 'express';
import { getSelectedProduct, getAllProducts } from '../controller/productController.js';

const productRouter = express.Router();

productRouter.route('/').get(getAllProducts);

productRouter.route('/:id').get(getSelectedProduct);

export default productRouter;
