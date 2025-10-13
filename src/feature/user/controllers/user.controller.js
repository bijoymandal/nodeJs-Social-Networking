import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ApplicationError } from "../../../error-handler/applicationError.js";
import { UserModel } from "../models/user.model.js";

export default class userController{
    async signUp(req,res){
        const {name,email,password}= req.body;
        console.log(req.body);
        try{
            const hashedPassword = await bcrypt.hash(password,12);
            const user = await UserModel.signUp(name,email,hashedPassword);
            res.status(201).json({message:"User registration successfully",data:user});
        }
        catch(error){
            res.status(500).json({message:"User registration failed",error:error});
        }
    }
    async signIn(req,res){
        const {email,password} = req.body;
        try{
            const userEmail = UserModel.findByEmail(email);
            if(!userEmail)
            {
                return res.status(400).json({message:"Invalid find email"});
            }
            else
            {
                const isPasswordValid = await bcrypt.compare(password,userEmail.password);
                if(isPasswordValid)
                {
                    //create token
                    const token = jwt.sign({userID:userEmail.id.toString(),email:userEmail.email},process.env.JWT_SECRET,{expiresIn:"1h"});
                    
                    //send token to client
                    return res.status(200).json({message:"User Login Successfully",token:token});
                }
                else
                {
                    return res.status(401).json({message:"Invalid email or password"});
                }
            }
        }
        catch(error)
        {
            res.status(500).json({message:"Invalid email or password",error:error});
        }
    }
    async getProfile(req,res){
        try{
            console.log(req.user.userID);
            const user = await UserModel.findById(req.user.userID);
            console.log(user);
            if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log("Found user:", user);
        return res.json(user);
        }
        catch(error)
        {
            throw new ApplicationError("User Application Error",500);
        }
    }
}