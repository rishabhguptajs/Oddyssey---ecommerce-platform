import React from "react"
import Layout from "../components/Layouts/Layout"
import { useSearch } from "../context/search"
import { useCart } from "../context/cart"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const Search = () => {
  const [values, setValues] = useSearch()
  const [cart, setCart] = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [values.results])

  return (
    <Layout title={"Search Results | Oddyssey"}>
      <div className="max-w-7xl mx-auto px-4 py-8 min-h-[60vh]">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font_styling mb-2">Search Results</h1>
          <h6 className="text-gray-500 font_styling mb-4">
            {values?.results.length < 1
              ? "No Products found"
              : `Found ${values?.results.length} product(s)`}
          </h6>
        </div>
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.results.length > 0 ? (
              values.results.map((product) => (
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
                        onClick={() => {
                          setCart([...cart, product])
                          localStorage.setItem("cart", JSON.stringify([...cart, product]))
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <span className="my-10 text-xl text-gray-400 font_styling col-span-full">No products found</span>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Search
