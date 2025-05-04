import {db} from "../connection.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const [result] = await db.query(
            "SELECT id, username FROM users WHERE username=? AND password_hash=?",
            [username, password]
        );

        const token = jwt.sign({id: result[0]?.id}, "secretKey", {
            expiresIn: "24h"
        });

        if (result.length == 0)
            return res.status(401).json({
                message: "email atau password salah"
            });

        res.json({token, ...result[0]});
    } catch (Err) {
        res.status(404).json(Err);
    }
};

export const register = async (req, res) => {
    const {username, email, password, profile, bio} = req.body;

    try {
        const [err, rows] = await db.query(
            "SELECT username FROM users WHERE username=?",
            [username]
        );
        if (rows[0].length > 0)
            return res.json({mesaage: "username telah digunakan"});

        const values = [username, email, password, profile, bio];

        const [eror, data] = await db.query(
            "INSERT INTO users (username, email, password_hash, profile_picture, bio) VALUES (?) ",
            [values]
        );
        if (eror) return res.json("terjadi kesalahan");
        if (data) return res.json("user created");
    } catch (e) {
        res.status(404).json("username telah digunakan");
    }
};

// INSERT INTO users (username, email, password_hash, profile_picture, bio) VALUES ('minzy', 'minzi@gmailmcom', 'minzy', 0, 'apa lu');
