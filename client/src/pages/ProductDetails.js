import React, { useState, useEffect } from "react"
import Layout from "../components/Layouts/Layout"
import axios from "axios"
import { useParams } from "react-router-dom"

const ProductDetails = () => {
  const params = useParams()
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
      <div className="container flex flex-row m-4">
        <img
          className="card-img-top w-[30em] h-[30em] m-2 rounded border-2"
          src={`/api/v1/product/product-photo/${product._id}`}
          alt={product.name}
        />
        <div>
          <h1 className="my-2 mx-6">{product.name}</h1>
          <p className="p-4 my-2 mx-6 bg-red-100 font_styling">
            <div>Description - {product.description}</div>
            <div>Price - ${product.price}</div>
            <div>Category - {product.category?.name}</div>
          </p>

          <div className="flex flex-row justify-between m-6">
            <button className="bg-green-500 p-2 rounded-lg text-white font_styling">
              Add to Cart
            </button>
            <button className="bg-blue-500 p-2 rounded-lg text-white font_styling">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetails
