"use strict";
const { User } = require('./db/models');
// import Users from './db/models/users.js'
// User.create({
//   firstName: "John",
//   lastName: "Doe",
//   email: "doe@example.com",
//   login: "johnDoe",
//   passwordHash: "asdasdgdgdbdq31241t",
//   userAge: 22,
//   profilePicture: "url/profile.jpg"
// }).then(console.log)
// User.create({
//   firstName: "Tom",
//   lastName: "Hanks",
//   email: "tom@example.com",
//   login: "tomHanks",
//   passwordHash: "gmffgpk311414n1masdkh",
//   userAge: 19,
//   profilePicture: "url/tom.jpeg"
// }).then(console.log)
// User.findAll().then(console.log)
// User.findAll({
//   attributes: ["firstName", "lastName", "email"]
// }).then(console.log);
// User.findAll({
//   attributes: {
//     exclude: ["createdAt", "updatedAt", "passwordHash", "id"]
//   }
// }).then(console.log);
User.destroy({
    where: {
        createdAt: null
    }
}).then(console.log);
// User.findByPk(2).then(console.log)
