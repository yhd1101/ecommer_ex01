import jwt, {decode} from "jsonwebtoken";
import userModel from "../models/user.js";

//req ,res 중간위치
const checkAuth = async (req, res) => { //토큰 검증함수
    //token은 헤더에 위치함
    const authorization = req.headers.authorization // 토큰 위치찾기
    if(authorization){ //검증해주는것
        const token = await authorization.slice(7, authorization.length)
        await jwt.verify(token, process.env.SECRET_KEY, (err, decode) => { //검증
            if(err){
                res.json({
                    msg : "token err"
                })
            }
            else { //성공
                req.user =decode
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