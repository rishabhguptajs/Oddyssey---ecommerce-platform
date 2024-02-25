import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoute.js"
import productRoutes from "./routes/productRoute.js"
import cors from "cors"
import Stripe from "stripe"

const app = express()

dotenv.config()

connectDB()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product", productRoutes)

app.get("/", (req, res) => {
  res.send("<h1>Hello from Ecommerce</h1>")
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
  const amountInPaise = amount * 100;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInPaise,
      currency: "inr",
      automatic_payment_methods:{
        enabled: true
      
      }
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
