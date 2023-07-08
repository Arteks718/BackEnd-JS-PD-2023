import { userController } from "../controllers/userController.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url)
const usersDB = require('../public/users.json')
interface IUsers {
  id: number;
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string
    age: number;
  };
  phone: string;
  cell: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}


class Users {
  users: IUsers[];
  count: number;

  constructor(data: IUsers[]) {
    this.users = [...data]
    this.count = this.users.length;
  }
  getUserById(id: number) {
    const findIndex = this.users.findIndex( u => u.id == id )
    return findIndex === - 1 ? null : this.users[findIndex]
  }
  getAllUsers() {
    return [...this.users]
  }
  createUser(user: IUsers) {
    this.count++;
    this.users.push({...user, id: this.count})
    return this.users[this.count-1]
  }
  updateUser(id: number, info: string[] | number []) {
    const findIndex = this.users.findIndex( u => u.id == id )
    this.users[findIndex] = {
      ...this.users[findIndex],
      ...info
    }
    return findIndex === - 1 ? null : this.users[findIndex];
  }
  deleteUser(id: number) {
    const findIndex = this.users.findIndex( u => u.id == id )
    // this.users.splice(findIndex, 1)
    return findIndex === -1 ? null : this.users.splice(findIndex, 1)
  }
  clg() {console.log(this.users)}
}

export const usersModel = new Users(usersDB);
