import mongoose from "mongoose";

const ordersSchema = mongoose.Schema({
    //product, qty, memo
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "product", //참조
        required : true
    },
    qty : { //개수
        type: Number,
        default : 1 // 최소 1개이상 구매

    },
    memo : {
        type : String
    }
})

const orderModel = mongoose.model("order", ordersSchema)

export default orderModel