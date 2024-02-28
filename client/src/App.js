import "./App.css"
import { NextUIProvider } from "@nextui-org/react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage.js"
import About from "./pages/About.js"
import Contact from "./pages/Contact.js"
import Products from "./pages/Products.js"
import Policy from "./pages/Policy.js"
import PageNotFound from "./pages/PageNotFound.js"
import Register from "./pages/Auth/Register.js"
import Login from "./pages/Auth/Login.js"
import ForgotPassword from "./pages/Auth/ForgotPassword.js"
import Dashboard from "./pages/user/Dashboard.js"
import "react-toastify/dist/ReactToastify.css"
import PrivateRoute from "./components/Routes/Private.js"
import AdminRoute from "./components/Routes/AdminRoute.js"
import AdminDashboard from "./pages/Admin/AdminDashboard.js"
import CreateCategory from "./pages/Admin/CreateCategory.js"
import CreateProduct from "./pages/Admin/CreateProduct.js"
import Users from "./pages/Admin/Users.js"
import Profile from "./pages/user/Profile.js"
import AllProducts from "./pages/Admin/Products.js"
import UpdateProduct from "./pages/Admin/UpdateProduct.js"
import Search from "./pages/Search.js"
import ProductDetails from "./pages/ProductDetails.js"
import CartPage from "./pages/CartPage.js"
import Checkout from "./pages/Checkout.js"
import Completion from "./pages/Completion.js"

function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/completed" element={<Completion />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/profile" element={<Profile />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/product/:slug" element={<UpdateProduct />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/products" element={<AllProducts />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  )
}

export default App
