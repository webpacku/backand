import {db} from "../connection.js";

export const Comment = async (req, res) => {
    const {postId} = req.query;
    const limit = parseInt(10);
    const offset = parseInt(req.query.offset) || 0;
    try {
        const [result] = await db.query(
            `SELECT comment.*, users.id, users.username, users.profile_pic 
        FROM comment 
        JOIN users ON (users.id = comment.user_id)
        WHERE comment.post_id = ?
        ORDER BY comment.createdAt DESC
        LIMIT ? OFFSET ?
      `,
            [postId, limit, offset]
        );
        const hasNextPage = result.length === limit;

        res.json({
            data: result,
            pagination: {
                next: hasNextPage,
                url: hasNextPage ? `/?offset=${offset + limit}` : null
            }
        });
    } catch (error) {}
};

export const addComment = async (req, res) => {
    const {userId} = req.session;
    const {postId, content} = req.body;
    try {
        const values = [postId, userId, content];
        const [rows] = await db.query(
            "INSERT INTO comments (post_id, user_id, content) VALUES (?)",
            [values]
        );
        res.send("berhasil");
    } catch (error) {
        res.status(404).send(error.message);
    }
};

export const updateComment = async (req, res) => {
    const {userId} = req.session;
    const {commentId, content} = req.body;
    try {
        const values = [content, commentId, userId];
        const [rows] = await db.query("DELETE FROM comment WHERE id=?", [
            postId
        ]);
        res.send("berhasil");
    } catch (error) {
        res.status(404).send(error.message);
    }
};
