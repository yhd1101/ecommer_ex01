import mongoose from "mongoose";

const productsSchema = mongoose.Schema({
    productName : String,
    price : Number,
    desc : String,
    category : String
})

const productModel = mongoose.model("product", productsSchema)

export default productModel