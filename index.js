import express from "express";
const app = express();
import cors from "cors";
import jwt from "jsonwebtoken";

import userRoutes from "./routes/auth.js";

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:4173"]
      //  origin: "https://arfa.serveo.net"
    })
);

app.use((req, res, next) => {
    const openRoutes = ["/login", "/register"];
    if (openRoutes.includes(req.path)) return next();
    const token = req.headers.authorization;
    // const token = authHeader?.split(" ")[1];
    if (!token) return res.status(401).send("token kosong 🤡");
    jwt.verify(token, "secretKey", (err, decode) => {
        if (err) return res.status(403).send("Expired Token 🙏");
        req.session = decode;
        next();
    });
});

app.use("/", userRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
