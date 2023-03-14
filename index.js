import express from "express"
import productRoutes from "./route/product.js"
import productOrders from "./route/order.js"
import morgan from "morgan"
import bodyParser from "body-parser";
import doEnv from "dotenv"
import mongoose from "mongoose";
const app = express()

doEnv.config()

app.use("/hello", (req, res) => {
    res.json({
        data : "HelloWorld",
        body : "hi"
    })
})

//데이터베이스 연결 정보

const dbAddress = process.env.MONGODB_ADDRESS
mongoose
    .connect(dbAddress)
    .then(_=>console.log(("database connected")))
    .catch(err => console.log(err.message))



//설정
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan("common"))


app.use("/product", productRoutes)

app.use("/order", productOrders)


const port = process.env.PORT || 9090

app.listen(port, console.log("Server started"))