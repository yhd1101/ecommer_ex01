import express from "express";
import orderModel from "../models/order.js";
import order from "../models/order.js";
import checkAuth from "../config/checkAuth.js";

const router = express.Router()
//order 전체를 불러오는 api
router.get("/", (req ,res) =>{
    orderModel
        .find()
        .populate("product")
        .populate("user")
        .then(order => {
            if(!order){
                return res.json({
                    msg : "No data"
                })
            }
            res.json({
                msg : "Successful get order",
                order : order
            })
        })

        .catch(err => {
            res.json({
                msg : err.message
            })
        })
})

//특정 order를 불러오는 api
router.get("/:orderid", (req, res) =>{
    orderModel
        .findById(req.params.orderid)
        .populate("product")
        .populate("user")
        .then(order =>{
            if(!order){
                return res.json({
                    msg : "No data"
                })
            }
            res.json({
                msg : "Succeesfull get order",
                order : order
            })

        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })
})
    //order 등록하는 api
router.post("/create",checkAuth, (req, res) => {
    const newOrder = new orderModel({
        product : req.body.product, //넵
        qty : req.body.qty,
        memo : req.body.memo,
        user : req.body.user
    })
    newOrder
        .save()// 저장
        .then(result => {
            res.json({
                msg : "Successful create order",
                user :result
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })
})

router.put("/:orderid", (req, res) => {
    const orderid = req.params.orderid  //변경할 대상

    const updateOps = {} // 업데이트할 내용

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    orderModel
        .findByIdAndUpdate(orderid, {$set : updateOps})
        .then(_=>{
            res.json({
                msg : `updated product by ${orderid}`
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })
})
//order 전체를 삭제하는 api
router.delete("/", (req, res) => {
    orderModel
        .deleteMany()
        .then(_ => {
            res.json({
                msg : "deleted orders"
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })
})

router.delete("/:orderid", (req, res) => {
    orderModel
        .findByIdAndUpdate(req.params.orderid)
        .then(_ => {
            res.json({
                msg : "deleted a order"
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })
})






export default router