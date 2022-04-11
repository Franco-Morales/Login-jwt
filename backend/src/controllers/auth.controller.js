import User from "../models/user";
import { hash, genSalt, compare } from "bcrypt";
import { createToken } from "../utils/jwt";


export const loggIn = async (req, res) => {
    let { email, password: pwd } = req.body;

    const user = await User.findOne({ email });
    const valid = await compare(pwd, user.password);

    if(!valid) return res.status(400).json({ 
        errors: { 
            password : { msg: "Invalid Email or Password" } 
        }
    });

    const accessToken = createToken(user._id);

    res.status(200).json({
        accessToken,
        username: user.username
    });
}


export const signUp = async (req, res) => {
    let { email, password: pwd, username} = req.body;


    let salt = await genSalt(10)
    let hashPwd = await hash(pwd, salt);

    const doc = new User({ email, password: hashPwd, username });
    await doc.save();

    const accessToken = createToken(doc._id);

    res.status(201).json({
        accessToken,
        username: doc.username
    });
}