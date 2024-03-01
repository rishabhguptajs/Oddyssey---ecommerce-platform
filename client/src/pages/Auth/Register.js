import React, { useState } from "react"
import Layout from "../../components/Layouts/Layout"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState(0)
  const [address, setAddress] = useState("")
  const [password, setPassword] = useState("")
  const [answer, setAnswer] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        answer,
        address,
      })
      if (res && res.data.success) {
        toast.success(res.data.message)
        navigate("/login")
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!")
    }
  }
  console.log(process.env.REACT_API)

  return (
    <Layout title={"Sign Up | Oddyssey"}>
      <div className="align-middle rounded-lg flex flex-col items-center w-full p-3 h-full bg-[#e13453]">
        <form
          action=""
          className="align-middle bg-[#fdd7d8] w-full px-4 py-5 flex flex-col items-center border-solid border-1 border-gray-400 mx-auto rounded-md shadow-[#e13453] shadow-medium max-w-md"
          onSubmit={handleSubmit}
        >
          <h1 className="mb-2 font_styling">Register Form</h1>
          <div className="mb-3 w-full">
            <label
              htmlFor="exampleInputName"
              className="font_styling form-label w-full py-2"
            >
              Name
            </label>
            <input
              type="text"
              className="form-control w-full font_styling"
              id="exampleInputName"
              aria-describedby="nameHelp"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label
              htmlFor="exampleInputEmail1"
              className="font_styling form-label w-full"
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
              htmlFor="exampleInputPassword1"
              className="form-label w-full font_styling"
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
            <label
              htmlFor="inputPhone"
              className="form-label w-full font_styling"
            >
              Phone
            </label>
            <input
              type="tel"
              className="form-control w-full"
              id="inputPhone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <label
              htmlFor="inputAddress"
              className="form-label w-full font_styling"
            >
              Address
            </label>
            <input
              type="text"
              className="form-control w-full"
              id="inputAddress"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <label
              htmlFor="inputAnswer"
              className="form-label w-full font_styling"
            >
              Answer
            </label>
            <input
              type="text"
              className="form-control w-full"
              id="inputAnswer"
              placeholder="What is your favourite color?"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary bg-blue-600 w-full">
            Submit
          </button>
        </form>
        <div className="flex flex-row items-center mt-2">
          <p className="py-1 mx-3 text-white">Already have an account?</p>
          <Link
            to="/login"
            className="bg-[#210e11] px-4 py-2 text-white rounded-lg hover:bg-[#443a3c] hover:shadow-xl"
          >
            Login
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Register
