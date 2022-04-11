import Product from "../models/product";
import { CustomError } from "../utils/customError";


export const getAllProducts = async (req, res) => {
    const products = await Product.find();
    
    res.json({ data: products });
}


export const getOneById = async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if(!product) return next(new CustomError("Product not found", 404));

    res.json({ data: product });
}