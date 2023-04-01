import orderModel from "../models/order.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import productModel from "../models/product.js";
import checkAuth from "../config/checkAuth.js";


// order 전체를 불러옴
const getOrder = async (req, res) =>{
    try{
        const newOrder = await orderModel.find()
            .populate("product")
            .populate("user")
        if(!newOrder){
            return res.json({
                msg : "No data"
            })
        }
        res.json({
            msg : "Successful get order",
            order : newOrder
        })
    }catch (err) {
        res.status(500).json({
            msg : err
        })
    }
}


//특정 order를 불러옴
const getOrderId = async (req ,res) => {
    try{
        const newOrder = await orderModel.findById(req.params.orderid)
            .populate("product")
            .populate("user")
        if(!newOrder){
            return res.json({
                msg : "No data"
            })
        }
        res.json({
            msg : "Successful get order",
            order : newOrder
        })
    }catch (err) {
        res.status(500).json({
            msg : err
        })
    }
}

//order를 등록하는 controller
const createOrder = async (req, res) => {
    const { product, qty, memo, user } =req.body

    try {
        const newOrder = new orderModel({
            product, qty, memo, user
        })
        newOrder.save()
        res.json({
            msg : "Successful create use",
            user : {
                product : newOrder.product,
                qty : newOrder.qty,
                memo : newOrder.memo,
                user : newOrder.user
            }
        })



    }catch (err) {
        res.status(500).json({
            msg : err
        })
    }

}

//order 수정
const updateOrder = async (req, res) => {
    const ordertid = req.params.orderid // 변경할 대상
    //변경하고자 하는 내용
    const updateOps = {} //{}안에 변경할 내용

    for(const ops of req.body){
        updateOps[ops.propName] =ops.value;
    }
    try {
        const newOrder = orderModel.findByIdAndUpdate(orderid , {$set : updateOps})
            .then(_ => {
                res.json({
                    msg : `updated ordered by ${orderid}`
                })
            })

    }catch (err) {
        res.status(500).json({
            msg : err
        })
    }
}

//order 전체를 삭제함
const deleteOrder = async (req, res) => {
    try {
        const newOrder = orderModel.deleteMany()
            .then(_ => {
                res.json({
                    msg : "deleted all orders"
                })
            })
    } catch (err) {
        res.status(500).json({
            msg : err
        })
    }
}

//특정 order를 삭제함
const deleteOrderId = async (req, res) => {
    try {
        const newOrder = new orderModel.findByIdAndDelete(req.params.orderid)
            .then(_ => {
                res.json({
                    msg : "deleted all orders"
                })
            })
    } catch (err) {
        res.status(500).json({
            msg : err
        })
    }
}

export {getOrder, getOrderId, createOrder, updateOrder, deleteOrder, deleteOrderId }