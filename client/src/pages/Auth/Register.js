import React from "react";
import Layout from "../../components/Layouts/Layout";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="font_styling mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
          </div>
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 px-6 pt-8 text-center text-xl font-bold font_styling">
              Registration Form
            </div>
            <div className="p-6 mt-1 ">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    className="font_styling text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="h-10 bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    id="name"
                    required
                    placeholder="Rishabh"
                    type="text"
                    name="name"
                  />
                </div>
                <div>
                  <label
                    className="font_styling text-sm font-medium"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="h-10 bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    id="email"
                    autoComplete="email"
                    placeholder="rishabh@example.com"
                    type="email"
                    name="email"
                  />
                </div>
                <div>
                  <label
                    className="font_styling text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="location"
                  >
                    Location
                  </label>
                  <input
                    className="h-10 bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    id="location"
                    autoComplete="street-address"
                    required
                    placeholder="Bangalore"
                    type="text"
                    name="location"
                  />
                </div>
                <div>
                  <label
                    className="font_styling text-sm font-medium"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <input
                    className="h-10 rounded-sm bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#e13453] focus:border-[#4a3f41] focus:z-10 sm:text-sm"
                    id="phone"
                    autoComplete="tel"
                    placeholder="+91 9876543210"
                    type="tel"
                    name="phone"
                  />
                </div>
                <div>
                  <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="text-center text-sm">
            Already have an account? &nbsp;
            <Link className="underline" to="/login">
              Login
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Register;
