import { productsModel } from "../models/product";
import { IProductsController } from '../interfaces/interface.js'

const productsController:IProductsController = {
  getProducts: async (req, res) => {
    await productsModel.getAllProducts()
      .then(async products => {
        console.log(typeof products)
        res.status(200).send(products);
      })
      .catch(error => {
        console.log(error)
      })
  },
  getProduct: (req, res) => {
    const foundProduct:any = productsModel.getProductById(Number(req.params.id));
    if(foundProduct) {
      res.status(201).send(foundProduct)
      return;
    }
    res.status(404).send(`Product #${req.params.id} not found`);
  },
  createNewProduct: (req, res) => {
    const { body } = req;
    const newProduct = productsModel.createProduct(body)
    res.status(200).send(newProduct);
  },
  updateProduct: (req, res) => {
    const updateProduct: any = productsModel.updateProductById(Number(req.params.id), req.body);
    if(updateProduct) {
      res.status(201).send(updateProduct)
      return;
    }
    res.status(404).send(`Product #${req.params.id} not found`);
  },
  deleteProduct: (req, res) => {
    const deleteProduct: any = productsModel.deleteProductById(Number(req.params.id))
    if(deleteProduct) {
      res.status(201).send(deleteProduct)
      return;
    }
    res.status(404).send(`Product #${req.params.id} not found`);
  },
}

module.exports = productsController;