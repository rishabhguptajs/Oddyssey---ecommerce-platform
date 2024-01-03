import React from "react";
import Layout from "../../components/Layouts/Layout";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <Layout>
      <div className="align-middle flex items-center w-full p-5 h-full">
        <form
          action=""
          className="align-middle w-fit p-5 flex flex-col items-center border-solid border-1 border-gray-400 mx-auto rounded-md shadow-[#e13453] shadow-medium"
        >
          <h1 className="py-3">Register Form</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label w-3">
              Name
            </label>
            <input
              type="text"
              className="form-control w-[20vw]"
              id="exampleInputName"
              aria-describedby="nameHelp"
              name="name"
            />
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control w-[20vw]"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label w-[20vw]"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
            />
          </div>
          <div>
            <Link to="/login" className="btn btn-primary bg-blue-600">
              Login
            </Link>
            <button type="submit" className="btn btn-primary bg-blue-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
