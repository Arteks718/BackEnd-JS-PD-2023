import { Request, Response } from 'express';
import { usersModel } from '../models/user.js';

export const userController = {
  getAllUsers: (req: Request, res: Response) => {
    const data = usersModel.getAllUsers();
    res.status(200).send(data);
  },
  getUserById: (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(typeof id);
    const findUser = usersModel.getUserById(Number(id));
    console.log(findUser);
    res.status(200).send(findUser);
  },
  createUser: (req: Request, res: Response) => {
    const { body } = req;
    const newUser = usersModel.createUser(body);
    res.status(201).send(newUser);
  },
  updateUser: (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    const findUser = usersModel.updateUser(Number(id), body);
    res.status(200).send(findUser);
  },
  deleteUser: (req: Request, res: Response) => {
    const { id } = req.params;
    const findUser = usersModel.deleteUser(Number(id));
    res.status(200).send(findUser);
  },
};
