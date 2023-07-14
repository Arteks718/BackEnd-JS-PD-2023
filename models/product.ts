const axios = require('axios')

class Product {
  async getAllProducts() {
    try {
      const { data } = await axios.get('https://fakestoreapi.com/products')
      return data
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getProductById(id:number){
  axios.get(`https://fakestoreapi.com/products/${id}`)
    .then((response: any) => {
      const productById: any = response.data;
      return productById
    })
    .catch((error: any) => console.log(error));
  }
  async createProduct(info:any){
  axios.post(`https://fakestoreapi.com/products`, {info})
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error));
  }
  async updateProductById(id:number, info: any){
  axios.patch(`https://fakestoreapi.com/products/${id}`, {info})
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error));
  }
  async deleteProductById(id:number){
  axios.delete(`https://fakestoreapi.com/products/${id}`)
      .then((response: any) => console.log(response))
      .catch((error: any) => console.log(error));
  }
}

const productsModel = new Product()

module.exports = productsModel
export { productsModel }