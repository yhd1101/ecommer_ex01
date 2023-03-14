import express from "express";
import productModel from "../models/product.js";

const router = express.Router()
//product를 등록하는 api
router.get("/", (req, res) => {
    res.json({
        msg : "product get all"
    })
})
//product를 등록하는 api
router.post("/create", (req, res) =>{
    // const newProduct ={
    //     name : req.body.productName,
    //     price : req.body.productPrice,
    //     desc : req.body.productDesc
    //
    // }
    const newProduct = new productModel({
        name : req.body.productName,
        price : req.body.productPrice,
        desc : req.body.productDesc,
        category : req.body.productCatagory
    })
    newProduct
        .save() //저장
        .then(resul =>{
            res.json({
                msg : "Successful create user"
            })
        })
        .catch(err =>{
            res.json({
                msg : err.message
            })
        })
})

router.put("/update", (req, res) =>{
    res.json({
        msg : "update product"
    })
})

router.delete("/delete", (req, res) => {
    res.json({
        msg : "deleted a product"
    })
})




export default router