import Express from 'express'

type TypeController = (req: Express.Request, res: Express.Response) => void

export interface IUsersController {
  getUser: TypeController;
  getUsers: TypeController;
  createNewUser: TypeController;
  updateUser: TypeController;
  deleteUser: TypeController;
}

export interface IProductsController {
  getProduct: TypeController;
  getProducts: TypeController;
  createNewProduct: TypeController;
  updateProduct: TypeController;
  deleteProduct: TypeController;
}