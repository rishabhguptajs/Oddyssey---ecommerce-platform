import Layout from "../components/Layouts/Layout"
import React from "react"
import { useCart } from "../context/cart"
import { useAuth } from "../context/auth"

const CartPage = () => {
  const [cart, setCart] = useCart()
  const [auth, setAuth] = useAuth()

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
        <div className="flex flex-row">
          <div className="grid grid-cols-3 gap-4 w-[60vw] m-4 mt-2">
            {cart.map((item) => (
              <div key={item._id} className="border p-4">
                <img
                  src={`/api/v1/product/product-photo/${item._id}`}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.description}</p>
                <div className="flex justify-between">
                  <p className="text-lg font-bold">₹{item.price}</p>
                  <button
                    className="bg-[#e13453] m-2 text-white px-4 py-2 transition-all hover:translate-y-[-2px] rounded"
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
          <div className="">
            <h1 className="border-b-3 p-4">Checkout | Payment</h1>
            <div className="flex flex-col">
              <div className="flex mt-10 mb-2">
                <h2 className="font-bold text-[2em]">Total -</h2>
                <h2 className="font-bold text-[2em]">&nbsp; ₹{total()}</h2>
              </div>
              <button className="bg-[#e13453] text-white px-4 py-2 transition-all hover:translate-y-[-2px] rounded">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CartPage
