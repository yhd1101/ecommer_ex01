import express from "express";
import productModel from "../models/product.js";
import product from "../models/product.js";
import Product from "../models/product.js";

const router = express.Router()
//product 전체를 불러오는 api
router.get("/", (req, res) => {
    productModel
        .find()
        .then(product =>{
            res.json({
                msg : "get all product",
                count : product.length,
                product : product
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })

})

//특정한 product를 불러오는 api
router.get("/:productid", (req, res) =>{
    productModel
        .findById(req.params.productid)
        .then(product => {
            if(!product){
                return res.json({
                    msg : "no data" //??
                })
            }
            res.json({
                msg : "Sucessfull get product",
                product : product
            })
        })
        .catch(err =>{
            res.json({
                msg : err.message
            })
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
        .then(result =>{
            res.json({
                msg : "Successful create use",
                user : {
                    name : result.name,
                    price : result.price,
                    desc : result.desc,
                    category : result.category
                }
            })
        })
        .catch(err =>{
            res.json({
                msg : err.message
            })
        })
})
//product를 update하는 api
router.put("/:productid", (req, res) => {
    const productid = req.params.productid // 변경할 대상
    //변경하고자 하는 내용
    const updateOps = {} //{}안에 변경할 내용

    for(const ops of req.body){
        updateOps[ops.propName] =ops.value;
    }

    productModel
        .findByIdAndUpdate(productid , {$set : updateOps})
        .then( _=> {
            res.json({
                msg : `updated producted by ${productid}`
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })

 })


//product 전체를 삭제하는 api
router.delete("/", (req, res) => {
    productModel
        .deleteMany()
        .then(_ => {
            res.json({
                msg : "deleted products"
            })
        })
        .catch(err =>{
            res.json({
                msg : err.message
            })
        })
})
//특정 product를 삭제하는 api
router.delete("/:productid", (req, res) =>{
    productModel
        .findByIdAndDelete(req.params.productid)
        .then(_ =>{
            res.json({
                msg : "deleted a products"
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })
})




export default router