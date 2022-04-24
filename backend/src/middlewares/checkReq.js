import { CustomError } from "../utils/customError";

const ALLOWED = [
    "OPTIONS",
    "HEAD",
    "CONNECT",
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH"
];


export const checkReqMethod = (req, res, next) => {
    if( !ALLOWED.includes(req.method) ) return next(new CustomError(`${req.method} not allowed`, 405)); 

    next();
}