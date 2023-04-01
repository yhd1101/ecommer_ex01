import express from "express";
import orderModel from "../models/order.js";
import order from "../models/order.js";
import checkAuth from "../config/checkAuth.js";
import {getOrder, getOrderId, createOrder, updateOrder, deleteOrder, deleteOrderId } from "../controllers/order.js"

const router = express.Router()
//order 전체를 불러오는 api
router.get("/", getOrder)

//특정 order를 불러오는 api
router.get("/:orderid", getOrderId)


    //order 등록하는 api
router.post("/create",checkAuth, createOrder)

router.put("/:orderid", updateOrder)


//order 전체를 삭제하는 api
router.delete("/", deleteOrder)

router.delete("/:orderid",deleteOrderId)






export default router