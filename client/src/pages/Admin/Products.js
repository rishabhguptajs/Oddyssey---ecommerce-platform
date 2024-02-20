import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  // get products here
  const getProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Error while getting products.");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout title={"Dashboard - Products"}>
      <div className="flex flex-row">
        <div className="flex justify-start m-5 hover:shadow-md transition-shadow w-fit border-[#c5cae9] border-4">
          <AdminMenu />
        </div>
        <div className="flex flex-col text-center m-5 hover:shadow-md transition-shadow w-[70vw] h-inherit p-4 border-[#c5cae9] border-4">
          <h1 className="font-bold font_styling p-3 h-fit w-full">
            All Products
          </h1>
          <div className="flex flex-row flex-wrap justify-center text-center">
            {products.length > 0 ? (
              products.map((product) => (
                <Link
                  key={product._id}
                  to={`/dashboard/admin/product/${product.slug}`}
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      className="card-img-top"
                      src={`/api/v1/product/product-photo/${product._id}`}
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">
                        {product.description.substring(0, 100)}
                      </p>
                      <a href="#" className="btn btn-primary m-2">
                        ₹ {product.price}
                      </a>
                    </div>
                  </div>
                </Link>
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
  );
};

export default AllProducts;
