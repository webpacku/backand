import {db} from "../../connection.js";
import {checkPost} from "./validasi.js";

export const getStatus = async (req, res) => {
    const {id} = req.session;

    const offset = parseInt(req.query.offset) || 0;
    const limit = 10;
    try {
        const [result] = await db.query(
            `
        SELECT s.*, u.username,u.profile_picture,
        COUNT(DISTINCT likes.id) AS likes,
        EXISTS (
          SELECT 1 FROM likes 
          WHERE likes.post_id = s.id AND likes.user_id = ?
        ) AS likes_me
        FROM posts AS s
        JOIN users AS u ON (u.id = s.user_id)
        LEFT JOIN likes ON (likes.post_id = s.id)
        GROUP BY s.id
        ORDER BY s.created_at DESC
        LIMIT ? OFFSET ?
      `,
            [id, limit, offset]
        );

        const hasNextPage = result.length === limit;
           console.log("status di ambil");
        res.json({
            data: result,
            pagination: {
                next: hasNextPage,
                url: hasNextPage ? `/?offset=${offset + limit}` : null
            }
        });
       
    } catch (err) {
        res.json(err);
    }
};

export const findStatus = async (req, res) => {
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
        FROM status AS s
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
    } catch (err) {
        res.status(404).json(err);
    }
};

export const insertStatus = async (req, res) => {
    const {id} = req.session;
    const values = [id, req.body.content];
    try {
        const [result] = await db.query(
            "INSERT INTO posts (user_id, content) VALUES (?)",
            [values]
        );

        if (result) return res.json("berhasil");
    } catch (e) {
        res.send(404).json({message: e});
    }
};
export const setStatus = () => {};

export const deleteStatus = async (req, res) => {
    const {postId} = req.body;
    try {
        const result = await db.query(
            "DELETE INTO status WHERE status.id = ? AND status.user_id =?",
            [postId, userId]
        );
        res.json({result});
    } catch (err) {
        res.status(404).json(err);
    }
};
