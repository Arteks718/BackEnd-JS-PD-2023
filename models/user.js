import { createRequire } from "module";
const require = createRequire(import.meta.url);
const usersDB = require('../public/users.json');
class Users {
    constructor(data) {
        this.users = [...data];
        this.count = this.users.length;
    }
    getUserById(id) {
        const findIndex = this.users.findIndex(u => u.id == id);
        return findIndex === -1 ? null : this.users[findIndex];
    }
    getAllUsers() {
        return [...this.users];
    }
    createUser(user) {
        this.count++;
        this.users.push(Object.assign(Object.assign({}, user), { id: this.count }));
        return this.users[this.count - 1];
    }
    updateUser(id, info) {
        const findIndex = this.users.findIndex(u => u.id == id);
        this.users[findIndex] = Object.assign(Object.assign({}, this.users[findIndex]), info);
        return findIndex === -1 ? null : this.users[findIndex];
    }
    deleteUser(id) {
        const findIndex = this.users.findIndex(u => u.id == id);
        // this.users.splice(findIndex, 1)
        return findIndex === -1 ? null : this.users.splice(findIndex, 1);
    }
    clg() { console.log(this.users); }
}
export const usersModel = new Users(usersDB);
