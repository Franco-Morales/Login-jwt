import { Schema, model } from "mongoose";


const UserSchema = new Schema({
    email: String,
    password: String,
    username: String
});


export default model('Users',UserSchema);