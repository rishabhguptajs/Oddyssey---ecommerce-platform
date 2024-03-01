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
    const { email, name, phone, address } = auth?.user
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
      <div className="flex flex-col">
        <div className="flex justify-start m-5 hover:shadow-md transition-shadow border-[#c5cae9] border-4 rounded-md">
          <UserMenu />
        </div>
        <div className="m-5 border-4 p-4 rounded border-[#3f51b5] w-fit h-fit">
          <div className="flex justify-center items-center h-full">
            <div className="w-full max-w-md">
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="mb-4 text-2xl font-bold text-center text-gray-800">
                  User Profile
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="exampleInputName"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-input w-full"
                      id="exampleInputName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="exampleInputEmail1"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-input w-full"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      You cannot change your email address.
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="inputPhone"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="form-input w-full"
                      id="inputPhone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="inputAddress"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-input w-full"
                      id="inputAddress"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
