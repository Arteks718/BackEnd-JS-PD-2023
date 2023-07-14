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
exports.productsModel = void 0;
const axios = require('axios');
class Product {
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield axios.get('https://fakestoreapi.com/products');
                return data;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            axios.get(`https://fakestoreapi.com/products/${id}`)
                .then((response) => {
                const productById = response.data;
                return productById;
            })
                .catch((error) => console.log(error));
        });
    }
    createProduct(info) {
        return __awaiter(this, void 0, void 0, function* () {
            axios.post(`https://fakestoreapi.com/products`, { info })
                .then((response) => console.log(response))
                .catch((error) => console.log(error));
        });
    }
    updateProductById(id, info) {
        return __awaiter(this, void 0, void 0, function* () {
            axios.patch(`https://fakestoreapi.com/products/${id}`, { info })
                .then((response) => console.log(response))
                .catch((error) => console.log(error));
        });
    }
    deleteProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            axios.delete(`https://fakestoreapi.com/products/${id}`)
                .then((response) => console.log(response))
                .catch((error) => console.log(error));
        });
    }
}
const productsModel = new Product();
exports.productsModel = productsModel;
module.exports = productsModel;
