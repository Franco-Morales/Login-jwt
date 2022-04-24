import { verify } from "jsonwebtoken";
import { CustomError } from "../utils/customError";

export const isAuth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if( !token ) return next( new CustomError("No token provided !", 401) );

    verify(token, process.env.SECRET_KEY, (err, payload) => {
        if(err) return next( new CustomError("Expired token!, from auth middleware", 401) );

        req.user = { id: payload.userId };

        next();
    });
}