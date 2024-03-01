import Layout from "../components/Layouts/Layout"
import React from "react"
import { useCart } from "../context/cart"
import { useAuth } from "../context/auth"
import { useNavigate } from "react-router-dom"

const CartPage = () => {
  const [cart, setCart] = useCart()
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()

  const total = () => {
    return cart.reduce((acc, item) => acc + item.price, 0)
  }

  const removeCartItem = (id) => {
    try {
      let myCart = [...cart]
      let index = myCart.findIndex((p) => p._id === id)
      myCart.splice(index, 1)
      setCart(myCart)
      localStorage.setItem("cart", JSON.stringify(myCart))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
      <div className="container">
        <h1 className="font_styling mx-4 my-2">Your Cart</h1>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-[60%] mx-4 mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cart.map((item) => (
                <div key={item._id} className="border p-4">
                  <img
                    src={`/api/v1/product/product-photo/${item._id}`}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold">₹{item.price}</p>
                    <button
                      className="bg-[#e13453] text-white px-4 py-2 transition-all hover:translate-y-[-2px] rounded"
                      onClick={() => removeCartItem(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {cart.length === 0 && (
                <div className="col-span-3 text-center">
                  <h2>Your cart is empty</h2>
                </div>
              )}
            </div>
          </div>
          <div className="md:w-[40%] mx-4 mt-4 md:mt-0">
            <h1 className="border-b-3 p-3 text-center text-[1.5em] h-[2em] font_styling">
              Checkout | Payment
            </h1>
            <div className="flex flex-col justify-between mt-10 mb-2">
              <div className="flex">
                <h2 className="font-bold text-[2em]">Total -</h2>
                <h2 className="font-bold text-[2em]">&nbsp; ₹{total()}</h2>
              </div>
              {auth?.user?.address ? (
                <div className="flex flex-col">
                  <div>
                    <h2 className="text-lg font-bold">Delivery Address</h2>
                    <div className="flex flex-row items-center justify-between">
                      <p>{auth?.user?.address}</p>
                      <button
                        className="hover:translate-y-[-2px] transition-all rounded py-1 bg-[#e13453] text-[#ffe9ea] px-2"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        UPDATE ADDRESS
                      </button>
                    </div>
                  </div>
                  <button
                    className="bg-[#e13453] my-8 text-white px-4 py-2 transition-all hover:translate-y-[-2px] rounded"
                    onClick={() =>
                      navigate("/checkout", { state: { total: total() } })
                    }
                  >
                    Checkout
                  </button>
                </div>
              ) : (
                <div>
                  {auth?.token ? (
                    <button
                      className="hover:translate-y-[-2px] transition-all rounded py-1 bg-[#e13453] text-[#ffe9ea] px-2"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      ADD ADDRESS
                    </button>
                  ) : (
                    <button
                      className="hover:translate-y-[-2px] transition-all rounded py-1 bg-[#e13453] text-[#ffe9ea] px-2"
                      onClick={() => navigate("/login", { state: "/cart" })}
                    >
                      LOGIN TO CHECKOUT
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CartPage
