import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
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
          <div className="mx-10 h-[60vh] bg-slate-300 p-3 rounded-lg text-gray-800 font_styling">
            Filter by Category
          </div>
          <div className="mx-10 flex flex-col w-[70vw] bg-slate-300 p-3 rounded-lg text-gray-800 font_styling">
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
                        {product.description.substring(0, 100)}
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
      </div>
    </Layout>
  );
};

export default HomePage;
