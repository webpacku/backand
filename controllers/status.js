import {db} from "../connection.js";

export const getStatus = async (req, res) => {
    const {id} = req.params;

    try {
        const [data] = await db.query(
            `
        SELECT s.*, u.username,
        COUNT(DISTINCT likes.id) AS likes,
        EXISTS (
          SELECT 1 FROM likes 
          WHERE likes.post_id = s.id AND likes.user_id = ?
        ) AS likes_me
        FROM posts AS s
        JOIN users AS u ON (u.id = s.user_id)
        LEFT JOIN likes ON (likes.post_id = s.id)
        WHERE s.id = ?
        GROUP BY s.id
        ORDER BY s.createdAt DESC
        LIMIT 1
      `,
            [3, id]
        );

        res.json({data});
    } catch (error) {
        res.status(404).json(error);
    }
};

export const addStatus = async () => {
    const {userId, content, images} = req.body;
    try {
        const [result] = await db.query(
            "INSERT INTO status (user_id, content, images, createdAt) VALUES (?)",
            values
        );
        const createdAt = new Date();
        const values = [userId, content, images, createdAt];
    } catch (error) {}
};

export const updateStatus = async () => {};
export const deleteStatus = async () => {};
