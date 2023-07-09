"use strict";
// import http from 'http';
// import app  from './app.js'
// const server = http.createServer(app);
// type IPort = number | undefined;
// type IHost = string | undefined;
// const PORT: IPort = 5000 || process.env.PORT;
// const HOST: IHost ='127.0.0.1' || process.env.HOST;
// server.listen(PORT, HOST, () => {
//   console.log(`Server is listening on ${HOST} on ${PORT}`);
// })
const { User } = require('./models');
// User.create({
//   firstName: "John",
//   lastName: "Adson",
//   email: "johnadmin@gmail.com"
// })
// .then(console.log)
// User.findByPk(1).then(console.log);
// User.create({
//   firstName: "Kate",
//   lastName: "Smith",
//   email: "katesmith@gmail.com"
// }).then(console.log)
// User.findAll().then(console.log);
User.findAll({ attributes: { exclude: ["createdAt", "updatedAt"] } }).then(console.log);
