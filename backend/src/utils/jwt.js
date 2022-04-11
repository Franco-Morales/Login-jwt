import { sign } from "jsonwebtoken"


export const createToken = ( userId ) => {
    return sign({ userId }, process.env.SECRET_KEY, { expiresIn: '8h' });
}