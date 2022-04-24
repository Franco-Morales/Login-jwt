import { Schema, model } from "mongoose";


const ProductSchema = new Schema({
    title: String,
    description: String,
    imgUrl: String,
    price: Number,
    stock: Number,
    company: String
});


export default model('Products', ProductSchema);