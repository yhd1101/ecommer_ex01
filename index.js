import express from "express"
import productRoutes from "./route/product.js"
import productOrders from "./route/order.js"
import morgan from "morgan"
const app = express()

app.use("/hello", (req, res) => {
    res.json({
        data : "HelloWorld",
        body : "hi"
    })
})
app.use(morgan("common"))

app.use("/product", productRoutes)

app.use("/order", productOrders)

const port = 9000

app.listen(port, console.log("Server started"))