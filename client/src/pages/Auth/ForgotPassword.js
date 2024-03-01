import React, { useState } from "react"
import Layout from "../../components/Layouts/Layout"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [answer, setAnswer] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      })
      if (res && res.data.success) {
        toast.success(res.data && res.data.message)
        navigate("/login")
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!")
    }
  }
  return (
    <Layout title={"Forgot Password | Oddyssey"}>
      <div className="align-middle items-center rounded-lg flex flex-col w-full p-3 h-[100vh] bg-[#e13453]">
        <form
          action=""
          className="align-middle bg-[#fdd7d8] w-full px-4 py-5 flex flex-col items-center border-solid border-1 border-gray-400 mx-auto rounded-md shadow-[#e13453] shadow-medium"
          onSubmit={handleSubmit}
        >
          <h1 className="mb-2 font_styling">Reset Password</h1>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="font_styling form-label mt-4"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control w-full font_styling"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div id="emailHelp" className="form-text font_styling">
              We'll never share your email with anyone else.
            </div>
            <label
              htmlFor="inputAnswer"
              className="font_styling form-label mt-4"
            >
              Enter your favourite color
            </label>
            <input
              type="text"
              className="form-control w-full font_styling"
              id="inputAnswer"
              aria-describedby="answerHelp"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
            <label
              htmlFor="exampleInputPassword1"
              className="form-label w-full font_styling mt-4"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control w-full"
              id="exampleInputPassword1"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-4 bg-blue-600 w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword
