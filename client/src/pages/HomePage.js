import React, { Fragment, useEffect, useState } from "react"
import Layout from "../components/Layouts/Layout"
import axios from "axios"
import { Checkbox, Radio } from "antd"
import { useNavigate } from "react-router-dom"
import { Prices } from "../components/Prices"
import { useCart } from "../context/cart"
import toast from "react-hot-toast"

const HomePage = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useCart()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count")
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  }

  const getCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category")
      if (data?.success) {
        setCategories(data.categories)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategories()
    getTotal()
  }, [])

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts(data?.products)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter((c) => c !== id)
    }
    setChecked(all)
  }

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts()
  }, [checked.length, radio.length])

  useEffect(() => {
    if (checked.length || radio.length) filterProduct()
    // eslint-disable-next-line
  }, [checked, radio])

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      })
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (page === 1) return
    loadMore()
    // eslint-disable-next-line
  }, [page])

  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...data?.products])
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <Layout>
      <div className="flex flex-col text-center">
        <div className="mx-10 my-6 text-center">
          <h1 className="text-3xl font-bold m-3 font_styling">Welcome home!</h1>
          <p className="font-serif">
            Explore some of our most popular products and categories below, or
            use the search bar to find exactly what you're looking for.
          </p>
        </div>
        <div className="flex flex-row mx-10 my-6 w-inherit justify-between">
          <div className=" h-[60vh] bg-slate-300 p-4 rounded-lg text-gray-800 font_styling">
            <div className="font_styling">Filter by Category</div>
            <div className="flex flex-col p-2 font_styling">
              {categories?.map((category) => (
                <Checkbox
                  key={category._id}
                  onChange={(e) => handleFilter(e.target.checked, category._id)}
                >
                  {category.name}
                </Checkbox>
              ))}
            </div>
            <div className="font_styling">Filter by Price</div>
            <Radio.Group
              className="flex flex-col p-2 font_styling"
              onChange={(e) => setRadio(e.target.value)}
            >
              {Prices?.map((price) => (
                <Fragment key={price._id}>
                  <Radio value={price.array}>{price.name}</Radio>
                </Fragment>
              ))}
            </Radio.Group>

            <button
              className="text-[#ae233c] bg-[#ffe9ea] px-3 py-2 my-3 rounded hover:shadow-sm hover:translate-y-[-2px] transition-all"
              onClick={() => window.location.reload()}
            >
              Reset
            </button>
            <div className="flex flex-col p-2 font_styling"></div>
          </div>
          <div className="mx-10 flex flex-col w-[70vw] bg-slate-300 p-3 rounded-lg text-gray-800 font_styling">
            {/* {JSON.stringify(radio)} */}
            <div>All Products</div>
            <div className="flex flex-row flex-wrap justify-center text-center">
              {products.length > 0 ? (
                products.map((product) => (
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      className="card-img-top"
                      src={`/api/v1/product/product-photo/${product._id}`}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">
                        {product.description.substring(0, 30)}
                      </p>
                      <div
                        href="#"
                        className="bg-gray-900 hover:translate-y-[-2px] hover:cursor-pointer transition-all hover:shadow-md text-white font_styling p-2 rounded-lg m-2"
                      >
                        ₹ {product.price}
                      </div>
                      <div className="flex flex-row w-full justify-between">
                        <div
                          className="mx-2 px-4 bg-[#0a090a] hover:translate-y-[-2px] hover:cursor-pointer transition-all hover:shadow-md text-white font_styling p-2 rounded-lg text-sm"
                          onClick={() => navigate(`/product/${product.slug}`)}
                        >
                          Details
                        </div>
                        <div
                          className="mx-2 px-3 bg-[#e13453] hover:translate-y-[-2px] hover:cursor-pointer transition-all hover:shadow-md text-white font_styling p-2 rounded-lg"
                          onClick={() => {
                            setCart([...cart, product])
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, product])
                            ) // save to local storage
                            toast.success("Added to cart✅")
                          }}
                        >
                          Add to Cart
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <span className="my-[5rem] text-[2em] font_styling">
                  No products found
                </span>
              )}
            </div>
          </div>
        </div>
        <div>
          {products && products.length < total && (
            <button
              className="bg-[#e13453] text-white px-4 py-2 transition-all hover:translate-y-[-2px] rounded"
              onClick={(e) => {
                e.preventDefault()
                setPage(page + 1)
                setLoading(true)
              }}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
