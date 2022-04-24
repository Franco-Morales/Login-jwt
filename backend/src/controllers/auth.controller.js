import { hash, genSalt, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";

import User from "../models/user";

import { creatAccessToken, creatRefreshToken } from "../utils/jwt";
import { CustomError } from "../utils/customError";


export const loggIn = async (req, res) => {
    let { email, password: pwd } = req.body;

    const userDoc = await User.findOne({ email });
    const valid = await compare(pwd, userDoc.password);

    if(!valid) return res.status(400).json({ 
        errors: { 
            password : { msg: "Invalid Email or Password" } 
        }
    });

    const accessToken = creatAccessToken({ userId: userDoc._id });
    const refreshToken = creatRefreshToken({ userId: userDoc._id });


    const expired_at = new Date();
    expired_at.setTime(expired_at.getTime() + 8*60*60*1000); // sumar 8h a la fecha actual

    userDoc.RefreshToken = {
        token: refreshToken,
        expired_at
    };

    await userDoc.save();


    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 1000*60*60*8, // 8h
        sameSite: "lax",
        secure: process.env.NODE_ENV !== "development"
    });

    res.status(200).json({
        accessToken,
        username: userDoc.username
    });
}


export const signUp = async (req, res) => {
    let { email, password: pwd, username} = req.body;


    let salt = await genSalt(10)
    let hashPwd = await hash(pwd, salt);

    const userDoc = new User({ email, password: hashPwd, username });
    await userDoc.save();

    res.status(201).json({ message: "User created !"});
}


export const refreshAccessToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies['refreshToken'];
        const payload = verify(refreshToken, process.env.REFRESH_KEY);

        if(!payload) return next( new CustomError("Unauthorized !", 401) );


        const userDoc = await User.findById(payload.userId);

        if( userDoc.RefreshToken?.expired_at.getTime() <= Date.now() ) return next( new CustomError("Expired token!", 401) );

        const accessToken = creatAccessToken({ userId: userDoc._id });

        res.json({ 
            accessToken,
            username: userDoc.username
        });

    } catch (error) {
        next( error );
    }
}


export const logout = async (req, res, next) => {
    try {
        const refTokenCookie = req.cookies['refreshToken'];
        const payload = verify(refTokenCookie, process.env.REFRESH_KEY);

        if(!payload) return next( new CustomError("Expired token!", 401) );

        await User.findOneAndUpdate({ 
            "RefreshToken.token": refTokenCookie 
        },{ 
            $unset: {
                RefreshToken: { }
            }
        });

        res.cookie("refreshToken", "", {
            httpOnly: true,
            maxAge: -1,
            secure: process.env.NODE_ENV !== "development"
        });
    
        res.status(200).json({
            message: "Success logout!"
        });
    } catch (error) {
        next( error );
    }
}