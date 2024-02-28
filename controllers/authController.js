import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"
import JWT from "jsonwebtoken"

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body
    // validating
    if (!name) {
      return res.send({ error: "Name is required" })
    }
    if (!email) {
      return res.send({ error: "Email is required" })
    }
    if (!password) {
      return res.send({ error: "Password is required" })
    }
    if (!phone) {
      return res.send({ error: "Phone number is required" })
    }
    if (!address) {
      return res.send({ error: "Address is required" })
    }
    if (!answer) {
      return res.send({ error: "Answer is required" })
    }

    // checking of existing users
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered, Please login!",
      })
    }

    // if no user, then register it
    const hashedPassword = await hashPassword(password)

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    })
    user.save()

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    })
  }
}

// post method for login

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password!!",
      })
    }

    // check user
    const user = await userModel.findOne({ email })
    console.log(user)
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email isn't registered!",
      })
    }
    const match = await comparePassword(password, user.password)
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Invalid Password!",
      })
    }

    // token here
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })
    res.status(200).send({
      success: true,
      message: "Login Successful!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in Login!",
      error,
    })
  }
}

// forgot password controller

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body
    if (!email) {
      res.status(404).send({
        success: false,
        message: "Email is required!",
      })
    }
    if (!answer) {
      res.status(404).send({
        success: false,
        message: "Question is required!",
      })
    }
    if (!newPassword) {
      res.status(404).send({
        success: false,
        message: "New Password is required!",
      })
    }
    // check for email and answer

    const user = await userModel.findOne({ email, answer })
    // validation here
    if (!user) {
      res.status(404).send({
        success: false,
        message: "Invalid Email or Answer!",
      })
    }
    // if user exists, then change password after hashing
    const hashedPassword = await hashPassword(newPassword)
    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword })
    res.status(200).send({
      success: true,
      message: "Password Changed Successfully!",
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in forgot password!",
      error,
    })
  }
}

// test controller function here

export const testController = (req, res) => {
  res.send("Protected Route!!")
}

// update profile controller

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body
    const user = await userModel.findById(req.user._id)
    if (password && password.length < 6) {
      return res.json({
        message: "Password must be atleast 6 characters long!",
      })
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    )
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully!",
      updatedUser,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in updating profile!",
      error,
    })
  }
}

// get orders controller

export const getOrdersController = async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting orders!",
      error,
    });
  }
}