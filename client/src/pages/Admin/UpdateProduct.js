import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //   get single product here
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

  // function for getting all categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getting categories.");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // function for handling submit

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success("Product created successfully!");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(productData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      await axios.delete(`/api/v1/product/delete-product/${id}`);
      navigate("/dashboard/admin/products");
      toast.success("Product deleted Succfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={" Dashboard - Update Product "}>
      <div className="flex flex-row">
        <div className="flex justify-start m-5 hover:shadow-md w-fit border-[#c5cae9] border-4 rounded-md transition-all">
          <AdminMenu />
        </div>
        <div className="flex flex-col rounded-lg transition-all justify-center m-5 hover:shadow-md w-fit h-inherit p-4 border-[#c5cae9] border-4">
          <h1 className="font-bold font_styling p-3 h-fit w-full">
            Update Product
          </h1>
          <Select
            placeholder="Select Category"
            className="w-inherit"
            showSearch
            onChange={(value) => {
              setCategory(value);
            }}
            value={category}
          >
            {categories?.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
          <div className="my-3">
            <label className="my-2 w-full bg-[#e13453] text-white p-2 rounded-lg hover:translate-y-[-2px] text-center cursor-pointer hover:shadow-md font_styling text-sm transition-all">
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => {
                  setPhoto(e.target.files[0]);
                }}
                hidden
              />
            </label>
          </div>
          <div className="flex justify-center">
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt="product"
                className="w-32 h-32 object-contain"
              />
            ) : (
              <img
                src={`/api/v1/product/product-photo/${id}`}
                alt="product"
                className="w-32 h-32 object-contain"
              />
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              placeholder="Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <textarea
              type="text"
              value={description}
              placeholder="Description"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              value={price}
              placeholder="Price"
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              value={quantity}
              placeholder="Quantity"
              className="form-control"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Select
              placeholder="Select Shipping "
              size="large"
              showSearch
              className="w-[20vw]"
              onChange={(value) => {
                setShipping(value);
              }}
              value={shipping ? "Yes" : "No"}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
          </div>
          <div className="mb-3 flex flex-row">
            <button
              className="my-2 bg-[#e13453] text-white p-2 rounded-lg hover:translate-y-[-2px] cursor-pointer hover:shadow-md font_styling text-sm transition-all w-[20vw]"
              onClick={handleUpdate}
            >
              UPDATE PRODUCT
            </button>
            <button
              className="my-2 mx-2 bg-[#e13453] text-white p-2 rounded-lg hover:translate-y-[-2px] cursor-pointer hover:shadow-md font_styling text-sm transition-all w-[20vw]"
              onClick={handleDelete}
            >
              DELETE PRODUCT
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
