import React, { useState } from "react"
import { useStripe, useElements } from "@stripe/react-stripe-js"
import { PaymentElement } from "@stripe/react-stripe-js"
import { useNavigate } from "react-router-dom"

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()

  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }
    setIsProcessing(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completed`,
      },
    })

    if (error) {
      setMessage(error.message)
    }

    setIsProcessing(false)
    navigate("/completed")
  }
  return (
    <form
      id="payment-form"
      className="bg-white h-fit p-4 w-fit rounded font_styling shadow-lg text-center"
      onSubmit={handleSubmit}
    >
      <PaymentElement id="payment-element" />
      <button
        disabled={isProcessing}
        id="submit"
        className="bg-green-500 px-3 py-2 rounded-md text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span id="button-txt">
          {isProcessing ? "Processing..." : "Pay Now"}
        </span>
      </button>
    </form>
  )
}

export default CheckoutForm
