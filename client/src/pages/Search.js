import React from "react"
import Layout from "../components/Layouts/Layout"
import { useSearch } from "../context/search"
const Search = () => {
  const [values, setValues] = useSearch()

  return (
    <Layout title={"Search Results | Oddyssey"}>
      <div className="container mx-auto">
        <div className="text-center">
          <h1 className="font_styling m-4">Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="flex flex-row flex-wrap justify-center text-center">
            {values.results.length > 0 ? (
              values?.results.map((product) => (
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
                      <div className="mx-2 px-4 bg-[#0a090a] hover:translate-y-[-2px] hover:cursor-pointer transition-all hover:shadow-md text-white font_styling p-2 rounded-lg text-sm">
                        Details
                      </div>
                      <div className="mx-2 px-3 bg-[#e13453] hover:translate-y-[-2px] hover:cursor-pointer transition-all hover:shadow-md text-white font_styling p-2 rounded-lg">
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
    </Layout>
  )
}

export default Search
