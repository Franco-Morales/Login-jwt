import { sign } from "jsonwebtoken"


export const creatAccessToken = ( payload ) => {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
}

export const creatRefreshToken = ( payload ) => {
    return sign(payload, process.env.REFRESH_KEY, { expiresIn: "8h" });
}