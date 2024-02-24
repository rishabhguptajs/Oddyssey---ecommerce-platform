import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// protected route here, based on token
export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decode; //gives the id to the user, without passing it, user won't have any id
        next();
    } catch (error) {
        console.log(error);
    }
}

// admin access middleware
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if(user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized Accress",
            })
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in Admin middleware!!"
        })
    }
}