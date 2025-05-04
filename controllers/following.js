import {db} from "../connection.js";

export const Following = async (req, res) => {
    const {id} = req.sessison;
    try {
        const [rows] = await db.query(
            `
            SELECT f.*, u.id, u.username, u.profile_picture FROM users AS u 
            JOIN following AS f ON (u.id = f.user_id)
            
            WHERE f.user_id=?
        `,
            [id]
        );
        res.json(rows);
    } catch (err) {
        res.status(401).json(err);
    }
};
