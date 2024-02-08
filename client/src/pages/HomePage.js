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
      setProducts(data.products);
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
      </div>
    </Layout>
  );
};

export default HomePage;
