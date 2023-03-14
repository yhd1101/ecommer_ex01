import mongoose from "mongoose";

const productsSchema = mongoose.Schema({
    name : String,
    price : Number,
    desc : String,
    category : String
})

const productModel = mongoose.model("product", productsSchema)

export default productModel