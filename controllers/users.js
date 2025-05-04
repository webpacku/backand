import {db} from "../connection.js";

export const User = async (req, res) => {
    const {id} = req.session;

    try {
        const [result] = await db.query(
            "SELECT u.id, u.username, u.bio, u.profile_picture FROM users AS u WHERE u.id !=? ",
            [id]
        );

        res.json(result);
    } catch (Error) {}
};
