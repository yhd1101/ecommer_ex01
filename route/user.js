import express from "express";
import userModel from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = express.Router()


//회원가입 등록하는 api
router.post("/signup", async (req, res) => {
    //id 유무 체크 => 패스워드 암호화

    const user  = await userModel.findOne({userId : req.body.userId})
    if(user){
        return res.json({
            msg : "user id existed"
        })
    }

    //password 암호화
    const hashedPassword = await bcrypt.hash(req.body.password, 10) //password를 암호화 하겠다 10자리까지


    const newSinup =new userModel({

        name : req.body.name,
        birth : req.body.birth,
        bio : req.body.bio,
        userId : req.body.userId,
        password : req.body.password,
        email : req.body.email,
        phone : req.body.phone

    })
    newSinup
        .save()
        .then(result =>{
            res.json({
                msg : "Successful signup",
                user : result
            })
        })
        .catch(err => {
            res.json({
                msg : err.message
            })
        })
})
//로그인 등록하는 api
router.post("/login", async (req, res) => {
    //id 유무 체크 => pawword compare =>접속정보 암호
    const user = await userModel.findOne({userId : req.body.userId})
    if(!user){
        return res.json({
            msg : "No userId"
        })
    }
    //jsonwebtoken 생성
    const token = await jwt.sign(
        {id : user._id},
        process.env.SECRET_KEY,
            {expiresIn: "1h"} //1시간
    )
    res.json({
        msg : "Successful login",
        token : token
    })


})

export default router