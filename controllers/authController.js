import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        // validating
        if(!name){
            return res.send({error: "Name is required"});
        }
        if(!email){
            return res.send({error: "Email is required"});
        }
        if(!password){
            return res.send({error: "Password is required"});
        }
        if(!phone){
            return res.send({error: "Phone number is required"});
        }
        if(!address){
            return res.send({error: "Address is required"});
        }

        // checking of existing users
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(200).send({
                success: true,
                message: 'Already Registered, Please login!'
            })
        }

        // if no user, then register it
        const hashedPassword = await hashPassword(password);

        const user = await new userModel({ name, email, phone, address, password: hashedPassword});
        user.save();

        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
}

// post method for login

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: "Invalid Email or Password!!"
            })
        }

        // check user
        const user = await userModel.findOne({email});
        console.log(user);
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Email isn't registered!",
            })
        }
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(500).send({
                success: false,
                message: "Invalid Password!"
            })
        }

        // token here
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.status(200).send({
            success:true,
            message: "Login Successful!",
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login!",
            error
        })
    }
}

// test controller function here

export const testController = (req, res) => {
    res.send('Protected Route!!');
}