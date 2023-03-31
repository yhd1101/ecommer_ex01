import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

//req, res 중간위치
const checkAuth = async (req, res, next) => { //토큰 검증함수 next 다음동작
    //token 헤더있음
    const authorization = req.headers.authorization //토큰 위치찾기
    if (authorization) { //검증해주는것
        const token = await authorization.slice(7, authorization.length)
        await jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => { //검증해줌
            if (err) { //실패
                res.json({
                    msg : "token err"
                })
            }
            else { //성공
                req.user = decoded
                // const user = userModel.findById(req.user.id)
                // req.user = user
                next()
            }
        })

    }
    else {
        res.json({
            msg : "No token"
        })
    }
}
export default checkAuth