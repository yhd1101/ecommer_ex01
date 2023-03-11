import express from "express";

const router = express.Router()

router.get("/", (req, res) => {
    res.json({
        msg : "product get all"
    })
})

router.post("/create", (req , res) =>{
    res.json({
        msg : "created a product"
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