import React, { Fragment, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Stripe from "stripe"
import CheckoutForm from "./CheckoutForm"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const Checkout = () => {
  const [stripePromise, setStripePromise] = useState(null)
  const [clientSecret, setClientSecret] = useState("")
  const location = useLocation()

  const total = location.state.total

  useEffect(() => {
    fetch("/config").then(async (r) => {
      const { publishableKey } = await r.json()
      setStripePromise(loadStripe(publishableKey))
    })
  }, [])

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: total, payment_method: "card" }),
    }).then(async (r) => {
      var { clientSecret } = await r.json()
      setClientSecret(clientSecret)
    })
  }, [])

  return (
    <div className="flex flex-col items-center justify-center text-center w-screen h-screen bg-[#e13453]">
      <div className="m-4 text-3xl font_styling cursor-default text-white">
        Checkout
      </div>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Checkout
