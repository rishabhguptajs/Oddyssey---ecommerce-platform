import React, { useState, useEffect } from "react"
import Layout from "../components/Layouts/Layout"
import axios from "axios"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { useCart } from "../context/cart"

const ProductDetails = () => {
  const params = useParams()
  const [cart, setCart] = useCart()
  const [product, setProduct] = useState({})

  useEffect(() => {
    if (params.slug) {
      getProduct()
    }
  }, [params?.slug])

  const getProduct = async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
    )
    setProduct(data?.product)
  }

  return (
    <Layout title={`${product.name} | Oddyssey`}>
      <div className="flex justify-center items-center min-h-[70vh] bg-gray-50 py-8 px-2">
        <div className="bg-white rounded-2xl shadow-lg max-w-3xl w-full flex flex-col md:flex-row gap-8 p-8">
          {product._id && (
            <div className="flex-1 flex items-center justify-center">
              <img
                className="object-contain rounded-xl max-h-80 w-full bg-gray-100"
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
                onError={e => { e.target.onerror = null; e.target.src = '/placeholder-image.jpg'; }}
              />
            </div>
          )}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold font_styling mb-2">{product.name}</h1>
              <p className="text-gray-500 text-lg mb-4 font_styling">{product.description}</p>
              <div className="mb-4">
                <span className="text-gray-400 font_styling">Category: </span>
                <span className="font_styling">{product.category?.name}</span>
              </div>
              <div className="mb-6">
                <span className="text-2xl font-bold text-[#e13453] font_styling">₹ {product.price}</span>
              </div>
            </div>
            <button
              className="w-full py-3 rounded-lg bg-[#e13453] text-white font_styling text-lg font-semibold hover:bg-[#ae233c] transition"
              onClick={() => {
                setCart([...cart, product])
                localStorage.setItem("cart", JSON.stringify([...cart, product]))
                toast.success("Added to cart✅")
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetails
