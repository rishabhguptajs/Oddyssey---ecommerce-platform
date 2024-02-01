import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card
              isFooterBlurred
              radius="lg"
              className="border-none"
            >
              <Image
                className="object-cover"
                height={200}
                src="https://as2.ftcdn.net/v2/jpg/05/31/26/65/1000_F_531266536_BOYa3SmzQm4YOr10a0HYa7NIeienqc5X.jpg"
                width={200}
              />
              <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-black">₹ {product.price}</p>
                <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
                  Notify me
                </Button>
              </CardFooter>
            </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllProducts;
