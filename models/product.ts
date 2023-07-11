const axios = require('axios')

class Product {
  getAllProducts() {
    axios.get('https://fakestoreapi.com/products')
      .then((response: any) => {
        const allProducts: any[] = response.data;
        return allProducts
      })
      .catch((error: any) => console.log(error));
  }
  getProductById(id:number){
    axios.get(`https://fakestoreapi.com/products/${id}`)
    .then((response: any) => {
      const productById: any = response.data;
      return productById
    })
    .catch((error: any) => console.log(error));
  }
  createProduct(info:any){
    axios.post(`https://fakestoreapi.com/products`, {info})
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error));
  }
  updateProductById(id:number, info: any){
    axios.patch(`https://fakestoreapi.com/products/${id}`, {info})
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error));
  }
  deleteProductById(id:number){
    axios.delete(`https://fakestoreapi.com/products/${id}`)
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error));
  }
}

const productsModel = new Product()

module.exports = productsModel