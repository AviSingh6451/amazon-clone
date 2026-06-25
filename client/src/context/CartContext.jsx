import { createContext, useState, useContext } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null)
  const { token } = useAuth()

  const getCart = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/cart',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCart(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const addToCart = async (product) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/cart/add',
        {
          productId: product._id,
          title: product.title,
          price: product.price,
          image: product.image
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCart(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/cart/remove/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCart(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/cart/update/${productId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCart(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const clearCart = async () => {
    try {
      await axios.delete(
        'http://localhost:5000/api/cart/clear',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCart(null)
    } catch (error) {
      console.log(error)
    }
  }

  const cartCount = cart?.items?.length || 0

  return (
    <CartContext.Provider value={{
      cart,
      getCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)