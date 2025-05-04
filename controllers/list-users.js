import {db} from "../connection.js";

export const ListUsers = async (req, res) => {
    const {id} = req.sessison;
    try {
        const [rows] = await db.query(
            "SELECT * FROM users WHERE users.id !=?",
            [id]
        );
        res.json(rows);
    } catch (err) {
        res.status(401).json(err);
    }
};
