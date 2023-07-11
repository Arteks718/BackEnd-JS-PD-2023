"use strict";
const axios = require('axios');
class Product {
    constructor(data) {
        this.products = [...data];
        this.count = data.length;
    }
    getAllProducts() {
    }
    getProductById(id) { }
    createProduct() { }
    updateProductById(id) { }
    deleteProductById(id) { }
}
const productsDB = axios.get('https://fakestoreapi.com/products')
    .then((res) => {
    return res.data.JSON();
})
    .catch((err) => console.log(err));
const productsModel = new Product(productsDB);
module.exports = productsModel;
