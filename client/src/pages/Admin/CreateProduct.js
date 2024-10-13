import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  // function for getting all categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getting categories.");
    }
  };

  // function for handling submit

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success("Product created successfully!");
        navigate("/dashboard/admin/products");
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setPhoto("");
        setCategory("");
      } else {
        toast.error(productData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Layout title={" Dashboard - Create Product "}>
      <div className="flex flex-row">
        <div className="flex justify-start m-5 hover:shadow-md w-fit border-[#c5cae9] border-4 rounded-md transition-all">
          <AdminMenu />
        </div>
        <div className="flex flex-col rounded-lg transition-all justify-center m-5 hover:shadow-md w-fit h-inherit p-4 border-[#c5cae9] border-4">
          <h1 className="font-bold font_styling p-3 h-fit w-full">
            Create Product
          </h1>
          <Select
            placeholder="Select Category"
            className="w-inherit"
            showSearch
            onChange={(value) => {
              setCategory(value);
            }}
          >
            {categories?.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>
          <div className="my-3">
            <label className="my-2 bg-[#e13453] text-white p-2 rounded-lg hover:translate-y-[-2px] w-[20vw] text-center cursor-pointer hover:shadow-md font_styling text-sm transition-all">
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
            {photo && (
              <img
                src={URL.createObjectURL(photo)}
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
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>
          </div>
          <div className="mb-3">
            <button
              className="my-2 bg-[#e13453] text-white p-2 rounded-lg hover:translate-y-[-2px] cursor-pointer hover:shadow-md font_styling text-sm transition-all w-[20vw]"
              onClick={handleCreate}
            >
              CREATE PRODUCT
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
