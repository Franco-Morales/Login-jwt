import { Schema, model } from "mongoose";


const UserSchema = new Schema({
    email: String,
    password: String,
    username: String,
    RefreshToken: new Schema({
        token: String,
        created_at: {
            type: Schema.Types.Date,
            default: new Date()
        },
        expired_at: Schema.Types.Date
    },{ 
        _id: false 
    })
});


export default model('Users', UserSchema);