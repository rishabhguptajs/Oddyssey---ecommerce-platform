import React, { useEffect, useState } from "react"
import Layout from "../../components/Layouts/Layout"
import UserMenu from "./UserMenu"
import { useAuth } from "../../context/auth"
import axios from "axios"
import { toast } from "react-hot-toast"
import { Link } from "react-router-dom"

const Profile = () => {
  // context api
  const [auth, setAuth] = useAuth()

  // state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState(0)
  const [address, setAddress] = useState("")
  const [password, setPassword] = useState("")

  console.log(auth.user)

  // fetch user data
  useEffect(() => {
    console.log(auth.user)
    const { address, email, name, phone } = auth?.user
    setName(name)
    setEmail(email)
    setPhone(phone)
    setAddress(address)
  }, [auth?.user])

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      })
      if (res?.error) {
        toast.error(res.error)
      } else {
        setAuth({ ...auth, user: res?.updatedUser })
        let ls = localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user = res.updatedUser
        localStorage.setItem("auth", JSON.stringify(ls))
        toast.success(res.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!")
    }
  }

  return (
    <Layout title={"Dashboard - Profile"}>
      <div className="flex flex-row">
        <div className="flex justify-start w-[25vw] m-5 hover:shadow-md transition-shadow border-[#c5cae9] border-4">
          <UserMenu />
        </div>
        <div className="m-5 border-4 p-4 rounded border-[#3f51b5] w-screen h-screen">
          <div>
            <div className="align-middle rounded-lg flex flex-col items-center w-full p-3 h-full bg-[#e13453]">
              <form
                className="align-middle bg-[#fdd7d8] w-fit px-5 py-2 flex flex-col items-center border-solid border-1 border-gray-400 mx-auto rounded-md shadow-[#e13453] shadow-medium"
                onSubmit={handleSubmit}
              >
                <h1 className="mb-2 font_styling">User Profile</h1>
                <div className="mb-3">
                  <label
                    htmlFor="exampleInputName"
                    className="font_styling form-label w-3 py-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control w-[20vw] font_styling"
                    id="exampleInputName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label
                    htmlFor="exampleInputEmail1"
                    className="font_styling form-label"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control w-[20vw] font_styling"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled
                  />

                  <label
                    htmlFor="inputPhone"
                    className="form-label w-[20vw] font_styling"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="inputPhone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <label
                    htmlFor="inputAddress"
                    className="form-label w-[20vw] font_styling"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary bg-blue-600">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
