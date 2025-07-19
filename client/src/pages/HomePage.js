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
    if (checked.length || radio.length) {
      setPage(1); // Reset to first page on filter
      filterProduct()
    }
  }, [checked, radio])

  const filterProduct = async () => {
    try {
      setLoading(true)
      // Convert radio value to array of numbers if it's a string
      let priceRange = radio
      if (typeof priceRange === 'string') {
        try {
          priceRange = JSON.parse(priceRange)
        } catch {
          priceRange = []
        }
      }
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, {
        checked,
        radio: priceRange,
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold font_styling mb-2">Discover Unique Products</h1>
          <p className="text-gray-500 text-lg md:text-xl font_styling">Curated, quality goods from passionate makers. No clutter, just what matters.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="md:w-1/4 w-full">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6 md:sticky md:top-24">
              <h2 className="text-lg font-semibold mb-4 font_styling">Filter by Category</h2>
              <div className="flex flex-col gap-2 mb-6">
                {categories?.map((category) => (
                  <Checkbox
                    key={category._id}
                    onChange={(e) => handleFilter(e.target.checked, category._id)}
                    className="font_styling"
                  >
                    {category.name}
                  </Checkbox>
                ))}
              </div>
              <h2 className="text-lg font-semibold mb-4 font_styling">Filter by Price</h2>
              <Radio.Group
                className="flex flex-col gap-2 mb-6"
                onChange={(e) => setRadio(e.target.value)}
                value={radio}
              >
                {Prices?.map((price) => (
                  <Fragment key={price._id}>
                    <Radio value={JSON.stringify(price.array)} className="font_styling">{price.name}</Radio>
                  </Fragment>
                ))}
              </Radio.Group>
              <button
                className="w-full bg-[#e13453] text-white py-2 rounded-lg font_styling hover:bg-[#ae233c] transition"
                onClick={() => window.location.reload()}
              >
                Reset Filters
              </button>
            </div>
          </div>
          {/* Products Grid */}
          <div className="md:w-3/4 w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold font_styling">All Products</h2>
              {loading && <span className="text-gray-400 text-sm">Loading...</span>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col h-full"
                  >
                    <div className="w-full aspect-square mb-4 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        className="object-contain max-h-48 w-full"
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                        alt={product.name}
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = '/placeholder-image.jpg'
                        }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h5 className="font-semibold text-lg font_styling mb-1 truncate">{product.name}</h5>
                        <p className="text-gray-500 text-sm mb-2 font_styling truncate">{product.description?.substring(0, 60) || "No description available"}...</p>
                      </div>
                      <div className="flex items-center justify-between mt-2 gap-2">
                        <span className="text-xl font-bold font_styling text-[#e13453]">₹ {product.price || "-"}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          className="flex-1 px-0 py-2 rounded-lg border border-gray-300 text-gray-700 font_styling bg-white hover:bg-gray-100 transition text-sm"
                          onClick={() => navigate(`/product/${product.slug}`)}
                        >
                          Details
                        </button>
                        <button
                          className="flex-1 px-0 py-2 rounded-lg bg-[#e13453] text-white font_styling hover:bg-[#ae233c] transition text-sm"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <span className="my-10 text-xl text-gray-400 font_styling">No products found</span>
              )}
            </div>
            <div className="flex justify-center mt-8">
              {!loading && products && products.length < total && (
                <button
                  className="bg-[#e13453] text-white px-6 py-2 rounded-lg font_styling hover:bg-[#ae233c] transition"
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
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
