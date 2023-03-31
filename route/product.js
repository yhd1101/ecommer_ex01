import express from "express";
import productModel from "../models/product.js";
import product from "../models/product.js";
import Product from "../models/product.js";
import { getProduct, getProductId, createProduct, updateProduct, deleteProduct, deleteProductId } from "../controllers/product.js"

const router = express.Router()
//product 전체를 불러오는 api
router.get("/", getProduct )

//특정한 product를 불러오는 api
router.get("/:productid", getProductId)

//product를 등록하는 api
router.post("/create", createProduct)


//product를 update하는 api
router.put("/:productid", updateProduct)


//product 전체를 삭제하는 api
router.delete("/", deleteProduct)


//특정 product를 삭제하는 api
router.delete("/:productid", deleteProductId)




export default router