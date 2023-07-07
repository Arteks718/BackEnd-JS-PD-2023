import { Request, Response } from 'express';
import { usersModel } from '../models/user.js';

export const userController = {
  getAllUsers: (req: Request, res: Response) => {
    const data = usersModel.getAllUsers();
    res.status(200).send(data);
  },
  getUserById: (req: Request, res: Response) => {
    const { id } = req.params;
    const findUser = usersModel.getUserById(Number(id));
    if(findUser) {
      res.status(200).send(findUser);
      return;
    } else {
      res.status(404).send(`User ${id} not found`);
    }
  },
  createUser: (req: Request, res: Response) => {
    const { body } = req;
    const newUser = usersModel.createUser(body);
    if(newUser) {
      res.status(201).send(newUser);
      return;
    } else {
      res.status(404).send(`Bad request. New user is not created`);
    }
  },
  updateUser: (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    const findUser = usersModel.updateUser(Number(id), body);
    if(findUser) {
      res.status(200).send(findUser);
      return;
    } else {
      res.status(404).send(`User ${id} not found`);
    }
  },
  deleteUser: (req: Request, res: Response) => {
    const { id } = req.params;
    const findUser = usersModel.deleteUser(Number(id));
    if(findUser) {
      res.status(200).send(findUser);
      return;
    } else {
      res.status(404).send(`User ${id} not found`);
    }
  },
};
