import { useState, useContext, createContext, useEffect } from "react"

const CartContext = createContext()
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

    useEffect(() => {
    const cart = localStorage.getItem("cart")
    if (cart) {
      setCart(JSON.parse(cart))
    }
    }, [])

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  )
}

// custom hook created
const useCart = () => useContext(CartContext)

export { useCart, CartProvider }
