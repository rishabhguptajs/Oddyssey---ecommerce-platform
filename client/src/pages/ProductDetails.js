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
      `/api/v1/product/get-product/${params.slug}`
    )
    setProduct(data?.product)
  }

  return (
    <Layout title={`${product.name} | Oddyssey`}>
      <div className="container flex flex-col md:flex-row m-4">
  <img
    className="card-img-top w-full md:w-[30em] h-auto md:h-[30em] m-2 rounded border-2"
    src={`/api/v1/product/product-photo/${product._id}`}
    alt={product.name}
  />
  <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full md:ml-4">
    <div className="md:w-[70%]">
      <h1 className="my-2 mx-6">{product.name}</h1>
      <p className="p-4 my-2 mx-6 bg-red-100 font_styling">
        <div>Description - {product.description}</div>
        <div>Price - ${product.price}</div>
        <div>Category - {product.category?.name}</div>
      </p>
    </div>
    <div className="flex flex-row justify-end md:w-[30%] md:mt-0 mt-4">
      <div
        className="mx-2 px-3 bg-[#e13453] hover:translate-y-[-2px] hover:cursor-pointer transition-all hover:shadow-md text-white font_styling p-2 rounded-lg"
        onClick={() => {
          setCart([...cart, product])
          localStorage.setItem("cart", JSON.stringify([...cart, product])) // save to local storage
          toast.success("Added to cart✅")
        }}
      >
        Add to Cart
      </div>
    </div>
  </div>
</div>

    </Layout>
  )
}

export default ProductDetails
