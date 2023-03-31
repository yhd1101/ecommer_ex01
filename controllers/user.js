import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
    const {userId, name, birth, email, password, bio, phone} = req.body
    try {
        // id 유무 체크 => password 암호화
        const user = await userModel.findOne({ userId }) //key value 이름이 같으면 value 생략가능
        if(user) {
            return res.status(400).json({
                msg : "user id existed"
            })
        }

        // password 암호화
        const hashedPassword = await bcrypt.hash(password, 10)
        const newSignup = new userModel({
            name, birth, bio, userId, email, phone,
            password : hashedPassword
        })
        const newUser = await newSignup.save()
        res.json({
            msg : "Successful signup",
            userInfo : newUser
        })

    } catch (err) {
        res.status(500).json({
            msg : err
        })
    }
}

const userLogin = async (req, res) => {
    const {userId, password} =req.body
    try {
        // id 유무 체크 => password compare => 접속정보 암호(return jwt(json web token)
        const user = await userModel.findOne({ userId })
        if(!user) {
            return res.json({
                msg : "No userId"
            })
        }
        const hashedPassword = await bcrypt.compare(password, user.password) //compare 매칭
        if(hashedPassword === false){
            return res.json({
                msg : "password do not match"
            })
        }
        //jsonwebtoken 생성
        const token =  await jwt.sign(
            //암호화된 값을 무엇을 담을건지
            {id : user._id},
            process.env.SECRET_KEY,
            { expiresIn: "1h"}
        )
        res.json({
            msg : "Successful login",
            token : token
        })
    }catch (err) {
        res.status(500).json({
            msg : err
        })
    }


}
const getProfile = async (req, res) =>{
    console.log(req.user)

    const { id } = req.user

    try{
        const user = await userModel.findById(id)
        if (!user) {
            return res.status(408).json({
                msg : "No user"
            })
        }
        res.json({
            msg : "get user",
            user : user
        })
    }catch (err) {
        res.status(500).json({
            msg : err
        })
    }
}

export { signup, userLogin, getProfile }
