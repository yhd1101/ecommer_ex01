import express from "express";
import checkAuth from "../config/checkAuth.js"
import {signup, userLogin, getProfile} from "../controllers/user.js";

const router = express.Router()

//불러오기
router.get("/", checkAuth, getProfile)


//회원가입 등록하는 api
router.post("/signup", signup)

//로그인
router.post("/login", userLogin)




export default router