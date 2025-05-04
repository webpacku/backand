import express from "express";
const route = express.Router();

import {login, register} from "../controllers/auth.js";
import { likes, deleteLikes} from '../controllers/likes.js'
import {
    getStatus,
    findStatus,
    insertStatus,
    setStatus,
    deleteStatus
} from "../controllers/status/index.js";

import { User } from '../controllers/users.js'
route.post("/login", login);
route.post("/register", register);
route.get("/user", User);

route.get("/status", getStatus);
route.get("/status/:id", findStatus);
route.post("/status", insertStatus);
route.post("/status/update", setStatus);
route.post("/status/delete", deleteStatus);

route.post("/likes", likes);
route.delete("/likes/:id", deleteLikes);


export default route;
