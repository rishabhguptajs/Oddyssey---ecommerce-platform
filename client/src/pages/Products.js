import React from "react"
import Layout from "../components/Layouts/Layout"
import ProductComp from "../components/ReusableComp/ProductComp"

const Products = () => {
  return (
    <Layout title={"Products | Oddyssey"}>
      <div className="flex flex-col mx-2 align-middle justify-center text-center">
        <div className="mt-5 mb-4 text-[2em] cursor-default font_styling">
          {" "}
          Products page - JUST AN EXAMPLE, NOT THE REAL VALUES OR PRODUCTS. <br /> (FOR REAL PRODUCTS, PLEASE USE THE HOMEPAGE OR SEARCH PAGE.)
        </div>
        <div className="flex flex-row flex-wrap">
          <ProductComp
            name={"Boat Headphones"}
            price={"$59.00"}
            img={
              "https://d2xamzlzrdbdbn.cloudfront.net/products/c60e7c74-f817-450b-a7f9-2c8a202e390e23220559_416x416.jpg"
            }
            description={"Anything and Everything you need"}
            rating={"⭐⭐⭐⭐"}
            stock={true}
          />
          <ProductComp
            name={"Boat Earbuds"}
            price={"$39.00"}
            img={
              "https://d2xamzlzrdbdbn.cloudfront.net/products/7d83d756-bad2-4491-8730-47282741df2f22220828_416x416.jpg"
            }
            description={"Noise Cancellation, 24hr Battery Life"}
            rating={"⭐⭐⭐⭐⭐"}
            stock={true}
          />
          <ProductComp
            name={"Boat Headphones"}
            price={"$59.00"}
            img={
              "https://d2xamzlzrdbdbn.cloudfront.net/products/c60e7c74-f817-450b-a7f9-2c8a202e390e23220559_416x416.jpg"
            }
            description={"Anything and Everything you need"}
            rating={"⭐⭐⭐⭐"}
            stock={true}
          />
          <ProductComp
            name={"Boat Earbuds"}
            price={"$39.00"}
            img={
              "https://d2xamzlzrdbdbn.cloudfront.net/products/7d83d756-bad2-4491-8730-47282741df2f22220828_416x416.jpg"
            }
            description={"Noise Cancellation, 24hr Battery Life"}
            rating={"⭐⭐⭐⭐⭐"}
            stock={true}
          />
          <ProductComp
            name={"Boat Headphones"}
            price={"$59.00"}
            img={
              "https://d2xamzlzrdbdbn.cloudfront.net/products/c60e7c74-f817-450b-a7f9-2c8a202e390e23220559_416x416.jpg"
            }
            description={"Anything and Everything you need"}
            rating={"⭐⭐⭐⭐"}
            stock={true}
          />
          <ProductComp
            name={"Boat Earbuds"}
            price={"$39.00"}
            img={
              "https://d2xamzlzrdbdbn.cloudfront.net/products/7d83d756-bad2-4491-8730-47282741df2f22220828_416x416.jpg"
            }
            description={"Noise Cancellation, 24hr Battery Life"}
            rating={"⭐⭐⭐⭐⭐"}
            stock={true}
          />
          <ProductComp
            name={"Boat Headphones"}
            price={"$59.00"}
            img={
              "https://d2xamzlzrdbdbn.cloudfront.net/products/c60e7c74-f817-450b-a7f9-2c8a202e390e23220559_416x416.jpg"
            }
            description={"Anything and Everything you need"}
            rating={"⭐⭐⭐⭐"}
            stock={true}
          />
          <ProductComp
            name={"Boat Earbuds"}
            price={"$39.00"}
            img={
              "https://d2xamzlzrdbdbn.cloudfront.net/products/7d83d756-bad2-4491-8730-47282741df2f22220828_416x416.jpg"
            }
            description={"Noise Cancellation, 24hr Battery Life"}
            rating={"⭐⭐⭐⭐⭐"}
            stock={true}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Products
