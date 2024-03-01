import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoute.js"
import productRoutes from "./routes/productRoute.js"
import cors from "cors"
import path from "path"
import Stripe from "stripe"
import { fileURLToPath } from "url"

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()

connectDB()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.static(path.join(__dirname, './client/build')))

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product", productRoutes)

app.use("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  })
})

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body
  const { method } = req.body
  const amountInPaise = amount * 100
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInPaise,
      currency: "inr",
      payment_method_types: ["card"],
    })
    res.send({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    res.status(400).send({
      error: {
        message: error.message,
      },
    })
  }
})
