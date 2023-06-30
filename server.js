import express from 'express'
import dotenv from 'dotenv'
import bodyParser from "body-parser";
dotenv.config()
const app = express();
import mongoose from 'mongoose';
const connectionString = process.env.CONNECTION_STRING
const PORT = process.env.PORT

import playerRoutes from "./routes/player.js";

app.use(express.json())
app.use(bodyParser.json());

app.use('/', playerRoutes)


mongoose.connect(
  connectionString
);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));


app.listen(PORT, function () {
  console.log("listening on 3000");
});
