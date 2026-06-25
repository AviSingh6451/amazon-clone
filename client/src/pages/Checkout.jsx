import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Checkout() {
  const { cart, getCart, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: ''
  })

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      getCart()
    }
  }, [user])

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = async () => {
    if (!address.street || !address.city || 
        !address.state || !address.pincode) {
      alert('Please fill all address fields!')
      return
    }
    await clearCart()
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <div style={{ textAlign: 'center', padding: '80px' }}>
        <div style={{ fontSize: '80px' }}>✅</div>
        <h1 style={{ color: 'green', marginTop: '20px' }}>
          Order Placed Successfully!
        </h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '10px' }}>
          Thank you {user?.name}! Your order is on its way.
        </p>
        <button
          onClick={() => navigate('/products')}
          style={{
            marginTop: '30px',
            backgroundColor: '#f90',
            border: 'none',
            padding: '15px 40px',
            borderRadius: '4px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Your cart is empty!</h2>
      </div>
    )
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '30px' }}>Checkout</h2>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>

        {/* Address Form */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h3 style={{ marginBottom: '15px' }}>Delivery Address</h3>

          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={address.street}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={address.pincode}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* Order Summary */}
        <div style={{
          flex: 1,
          minWidth: '300px',
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '8px'
        }}>
          <h3 style={{ marginBottom: '15px' }}>Order Summary</h3>

          {cart.items.map((item) => (
            <div key={item.productId} style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '10px',
              paddingBottom: '10px',
              borderBottom: '1px solid #ddd'
            }}>
              <span>{item.title} x {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '20px',
            fontWeight: 'bold',
            marginTop: '15px'
          }}>
            <span>Total:</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            style={{
              width: '100%',
              marginTop: '20px',
              backgroundColor: '#f90',
              border: 'none',
              padding: '15px',
              borderRadius: '4px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout