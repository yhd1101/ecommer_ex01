import express from "express"
const app = express()

app.use("/hello", (req, res) => {
    res.json({
        data : "HelloWorld",
        body : "hi"
    })
})

const port = 9000

app.listen(port, console.log("Server started"))