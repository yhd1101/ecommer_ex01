import productModel from "../models/product.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


//product 전체를 불러옴
const getProduct = async (req, res) => {
    try{
        const newProduct = await productModel.find()
        res.json({
            msg : "get all product",
            count : newProduct.length,
            product : newProduct
        })
    }catch (err) {
        res.status(500).json({
            msg : err
        })
    }
}
//특정 product를 불러옴
const getProductId = async (req, res) => {


    try{
        const product = productModel.findById(req.params.productid)
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

    }catch (err) {
        res.status(500).json({
            msg : err
        })
    }
}
//product 등록하는 api
const createProduct = async (req ,res) => {
    const { productName, price, desc, category} = req.body

    try {
        const newProduct = new productModel({
            productName, price,desc, category
        })
        newProduct.save()
        res.json({
            msg : "Successful create use",
            user : {
                name : newProduct.productName,
                price : newProduct.price,
                desc : newProduct.desc,
                category : newProduct.category
            }
        })



    }catch (err) {
        res.status(500).json({
            msg : err
        })
    }
}

//product 수정
const updateProduct = async (req, res) =>{
    const productid = req.params.productid // 변경할 대상
    //변경하고자 하는 내용
    const updateOps = {} //{}안에 변경할 내용

    for(const ops of req.body){
        updateOps[ops.propName] =ops.value;
    }
    try {
        const newProudct = productModel.findByIdAndUpdate(productid , {$set : updateOps})
            .then(_ => {
                res.json({
                    msg : `updated producted by ${productid}`
                })
            })

    }catch (err) {
        res.status(500).json({
            msg : err
        })
    }

}
//product 전체를 삭제함
const deleteProduct = async (req, res) => {
    try {
        const newProduct = productModel.deleteMany()
            .then(_ => {
                res.json({
                    msg : "deleted all products"
                })
            })
    } catch (err) {
        res.status(500).json({
            msg : err
        })
    }
}

//특정 product를 삭제함 ??
const deleteProductId = async (req, res) => {
    try {
        const newProduct = new productModel.findByIdAndDelete(req.params.productid)
            .then(_ => {
                res.json({
                    msg : "deleted all products"
                })
            })
    } catch (err) {
        res.status.json({
            msg : err
        })
    }

}

export {getProduct, getProductId, createProduct, updateProduct, deleteProduct, deleteProductId}