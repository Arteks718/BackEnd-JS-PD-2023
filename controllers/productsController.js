"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const productsController = {
    getProducts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield product_1.productsModel.getAllProducts()
            .then((products) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(typeof products);
            res.status(200).send(products);
        }))
            .catch(error => {
            console.log(error);
        });
    }),
    getProduct: (req, res) => {
        const foundProduct = product_1.productsModel.getProductById(Number(req.params.id));
        if (foundProduct) {
            res.status(201).send(foundProduct);
            return;
        }
        res.status(404).send(`Product #${req.params.id} not found`);
    },
    createNewProduct: (req, res) => {
        const { body } = req;
        const newProduct = product_1.productsModel.createProduct(body);
        res.status(200).send(newProduct);
    },
    updateProduct: (req, res) => {
        const updateProduct = product_1.productsModel.updateProductById(Number(req.params.id), req.body);
        if (updateProduct) {
            res.status(201).send(updateProduct);
            return;
        }
        res.status(404).send(`Product #${req.params.id} not found`);
    },
    deleteProduct: (req, res) => {
        const deleteProduct = product_1.productsModel.deleteProductById(Number(req.params.id));
        if (deleteProduct) {
            res.status(201).send(deleteProduct);
            return;
        }
        res.status(404).send(`Product #${req.params.id} not found`);
    },
};
module.exports = productsController;
