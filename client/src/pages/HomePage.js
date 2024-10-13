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
  const [error, setError] = useState(null)

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`)
      if (data && typeof data.total === 'number') {
        setTotal(data.total)
      } else {
        throw new Error("Invalid data received for product count")
      }
    } catch (error) {
      console.error("Error fetching product count:", error)
      setError("Failed to load product count. Please try again later.")
    }
  }

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      if (data?.success && Array.isArray(data.categories)) {
        setCategories(data.categories)
      } else {
        throw new Error("Invalid data received for categories")
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
      setError("Failed to load categories. Please try again later.")
    }
  }

  useEffect(() => {
    getCategories()
    getTotal()
  }, [])

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      if (data?.products && Array.isArray(data.products)) {
        setProducts(data.products)
      } else {
        throw new Error("Invalid data received for products")
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      setError("Failed to load products. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = (value, id) => {
    const updatedChecked = value ? [...checked, id] : checked.filter(c => c !== id)
    setChecked(updatedChecked)
  }

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts()
  }, [checked.length, radio.length])

  useEffect(() => {
    if (checked.length || radio.length) filterProduct()
  }, [checked, radio])

  const filterProduct = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, {
        checked,
        radio,
      })
      if (data?.products && Array.isArray(data.products)) {
        setProducts(data.products)
      } else {
        throw new Error("Invalid data received for filtered products")
      }
    } catch (error) {
      console.error("Error filtering products:", error)
      setError("Failed to filter products. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (page === 1) return
    loadMore()
  }, [page])

  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      if (data?.products && Array.isArray(data.products)) {
        setProducts(prevProducts => [...prevProducts, ...data.products])
      } else {
        throw new Error("Invalid data received for additional products")
      }
    } catch (error) {
      console.error("Error loading more products:", error)
      setError("Failed to load more products. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const addToCart = (product) => {
    try {
      const updatedCart = [...cart, product]
      setCart(updatedCart)
      localStorage.setItem("cart", JSON.stringify(updatedCart))
      toast.success("Added to cart✅")
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast.error("Failed to add to cart. Please try again.")
    }
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center p-4">
          <h2 className="text-2xl font-bold text-red-600">{error}</h2>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex flex-col text-center p-4">
        <h1 className="text-4xl font-bold mb-2">Welcome home!</h1>
        <p className="text-lg mb-6">Explore our popular products and categories below, or use the search bar to find what you're looking for.</p>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-1/3 bg-gray-200 p-4 rounded-lg shadow-md">
            <h2 className="font-semibold mb-2">Filter by Category</h2>
            <div className="flex flex-col mb-4">
              {categories?.map((category) => (
                <Checkbox
                  key={category._id}
                  onChange={(e) => handleFilter(e.target.checked, category._id)}
                >
                  {category.name}
                </Checkbox>
              ))}
            </div>
            <h2 className="font-semibold mb-2">Filter by Price</h2>
            <Radio.Group
              className="flex flex-col mb-4"
              onChange={(e) => setRadio(e.target.value)}
            >
              {Prices?.map((price) => (
                <Fragment key={price._id}>
                  <Radio value={price.array}>{price.name}</Radio>
                </Fragment>
              ))}
            </Radio.Group>
            <button
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
              onClick={() => window.location.reload()}
            >
              Reset
            </button>
          </div>
          <div className="w-full md:w-2/3 bg-gray-200 p-4 rounded-lg shadow-md">
            <h2 className="font-semibold mb-2">All Products</h2>
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div key={product._id} className="card p-2 border rounded-lg shadow-sm">
                      <img
                        className="w-full h-48 object-cover rounded-t-lg"
                        src={`/api/v1/product/product-photo/${product._id}`}
                        alt={product.name}
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = '/placeholder-image.jpg'
                        }}
                      />
                      <div className="p-2">
                        <h5 className="font-semibold">{product.name}</h5>
                        <p className="text-sm text-gray-600">{product.description?.substring(0, 30) || "No description available"}...</p>
                        <div className="text-lg font-bold my-2">₹ {product.price || "Price not available"}</div>
                        <div className="flex justify-between">
                          <button
                            className="bg-gray-800 text-white py-1 px-2 rounded hover:bg-gray-700 transition"
                            onClick={() => navigate(`/product/${product.slug}`)}
                          >
                            Details
                          </button>
                          <button
                            className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition"
                            onClick={() => addToCart(product)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="my-10 text-xl">No products found</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-4">
          {!loading && products && products.length < total && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              onClick={(e) => {
                e.preventDefault()
                setPage(page + 1)
              }}
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
