import express from "express";
import userController  from "../controllers/user.controller.js";
import jwtAuth from "../../../middleware/jwt.middleware.js";

const userRouter = express.Router();
const Usercontroller = new userController();

userRouter.post("/signup",(req,res)=>{
    Usercontroller.signUp(req,res);
});
userRouter.post("/signIn",(req,res)=>{
    Usercontroller.signIn(req,res);
    // console.log("user signIn");
})
userRouter.get("/profile",jwtAuth,(req,res)=>{
    Usercontroller.getProfile(req,res);
});

export default userRouter;