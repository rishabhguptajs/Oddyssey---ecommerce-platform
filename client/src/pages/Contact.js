import React from "react"
import Layout from "../components/Layouts/Layout"

const Contact = () => {
  return (
    <Layout title={"Contact US | Oddyssey"}>
      <div className="flex justify-center items-center h-screen p-8 m-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Contact us</h1>

          <p className="text-lg mb-8">
            If you have any questions or concerns, please don't hesitate to
            contact us. We're here to help you in any way we can, and we're
            always happy to hear from our customers. You can reach us by email
            at{" "}
            <a
              href="mailto:rishabhgupta4523@gmail.com"
              className="text-blue-500 text-[20px] font-bold hover:underline"
            >
              here.{" "}
            </a>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
