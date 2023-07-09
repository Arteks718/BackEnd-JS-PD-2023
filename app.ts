import express, { Request } from "express";
const app = express();

app.use(express.json());
app.use("/", express.static("public"));

export default app;
