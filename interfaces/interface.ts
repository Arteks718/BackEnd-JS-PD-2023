type TypeController = (req: Express.Request, res: Express.Response) => void

interface IUsersController {
  getUser: TypeController;
  getUsers: TypeController;
  createNewUser: TypeController;
  updateUser: TypeController;
  deleteUser: TypeController;
}

interface IProductsController {
  getProduct: TypeController;
  getProducts: TypeController;
  createNewProduct: TypeController;
  updateProduct: TypeController;
  deleteProduct: TypeController;
}