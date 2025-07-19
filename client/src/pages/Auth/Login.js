import React, { useState } from "react"
import Layout from "../../components/Layouts/Layout"
import { useNavigate, useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"
import { useAuth } from "../../context/auth"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const [auth, setAuth] = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
        email,
        password,
      })
      if (res && res.data.success) {
        toast.success(res.data && res.data.message)
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        })
        localStorage.setItem("auth", JSON.stringify(res.data))
        navigate(location.state || "/")
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!")
    }
  }
  console.log(process.env.REACT_APP_API)
  return (
    <Layout title={"Login | Oddyssey"}>
      <div className="align-middle p-5 rounded-lg flex flex-col items-center w-full h-[100vh] bg-[#e13453]">
        <form
          action=""
          className="align-middle bg-[#fdd7d8] w-full md:w-fit px-4 md:px-10 py-5 flex flex-col items-center border-solid border-1 border-gray-400 mx-auto rounded-md shadow-[#e13453] shadow-medium"
          onSubmit={handleSubmit}
        >
          <h1 className="mb-2 font_styling">Login Form</h1>
          <div className="mb-3 w-full">
            <label
              htmlFor="exampleInputEmail1"
              className="font_styling form-label mt-4"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control w-full md:w-[20vw] font_styling"
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
              htmlFor="exampleInputPassword1"
              className="form-label w-full md:w-[20vw] font_styling mt-4"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control w-full"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-4 bg-blue-600 w-full md:w-auto"
          >
            Submit
          </button>
        </form>
        <div className="flex flex-row items-center mt-2">
          <p className="py-3 mx-3 text-white">Forgot Password?</p>
          <button
            onClick={() => navigate("/forgot-password")}
            className="bg-[#210e11] px-4 py-2 text-white rounded-lg hover:bg-[#443a3c] hover:shadow-xl"
          >
            Reset
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default Login
