import {db} from "../connection.js";

export const likes = async (req, res) => {
    const {postId} = req.body;
    const {id} = req.session;
    try {
        const values = [postId, id];
        const [err] = await db.query(
            "INSERT INTO likes (post_id, user_id) VALUES (?)",
            [values]
        );
        console.log("di sukai");
    } catch (e) {
        console.log(e);
    }
};

export const deleteLikes = async (req, res) => {
    const {id} = req.params;
    try {
        const values = [id, req.session.id];
        const [result, fields] = await db.query(
            "DELETE FROM likes WHERE post_id=? AND user_id=?",
            values
        );
        if (result.affectedRows == 0) return res.status(404).send("gagal");
        res.send("berhasil");
        console.log("di hapus")
    } catch (e) {
        console.log(e.message);
    }
};
