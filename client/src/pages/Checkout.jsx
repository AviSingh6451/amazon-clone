import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Checkout() {
  const { cart, getCart, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState({
    street: '', city: '', state: '', pincode: ''
  })

  useEffect(() => {
    if (!user) navigate('/login')
    else getCart()
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
    setLoading(true)
    await clearCart()
    setLoading(false)
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          background: 'rgba(0,200,83,0.1)',
          border: '2px solid rgba(0,200,83,0.3)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '60px',
          marginBottom: '30px'
        }}>
          ✅
        </div>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '900',
          color: '#fff',
          marginBottom: '15px'
        }}>
          Order Placed!
        </h1>
        <p style={{
          color: '#666',
          fontSize: '18px',
          marginBottom: '40px'
        }}>
          Thank you {user?.name}! Your order is on its way 🚀
        </p>
        <button
          onClick={() => navigate('/products')}
          style={{
            background: 'linear-gradient(135deg, #f90, #ff6600)',
            border: 'none',
            padding: '18px 45px',
            borderRadius: '50px',
            fontSize: '18px',
            fontWeight: '800',
            cursor: 'pointer',
            color: 'black',
            boxShadow: '0 8px 25px rgba(255,153,0,0.4)'
          }}
        >
          Continue Shopping →
        </button>
      </div>
    )
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '24px'
      }}>
        Your cart is empty!
      </div>
    )
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )

  const inputStyle = {
    width: '100%',
    padding: '14px 18px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    marginBottom: '15px'
  }

  const labelStyle = {
    color: '#888',
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '8px'
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      padding: '40px'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{
          fontSize: '13px',
          color: '#f90',
          letterSpacing: '3px',
          marginBottom: '10px',
          textTransform: 'uppercase'
        }}>
          Almost There
        </div>
        <h2 style={{
          fontSize: '42px',
          fontWeight: '800',
          color: '#fff'
        }}>
          Checkout
        </h2>
      </div>

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '30px'
      }}>
        {/* Address Form */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          padding: '30px'
        }}>
          <h3 style={{
            color: '#fff',
            fontSize: '20px',
            fontWeight: '700',
            marginBottom: '25px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            📍 Delivery Address
          </h3>

          <label style={labelStyle}>Street Address</label>
          <input
            type="text"
            name="street"
            placeholder="123 Main Street"
            value={address.street}
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={labelStyle}>City</label>
          <input
            type="text"
            name="city"
            placeholder="Mumbai"
            value={address.city}
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={labelStyle}>State</label>
          <input
            type="text"
            name="state"
            placeholder="Maharashtra"
            value={address.state}
            onChange={handleChange}
            style={inputStyle}
          />

          <label style={labelStyle}>Pincode</label>
          <input
            type="text"
            name="pincode"
            placeholder="400001"
            value={address.pincode}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        {/* Order Summary */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h3 style={{
            color: '#fff',
            fontSize: '20px',
            fontWeight: '700',
            marginBottom: '25px'
          }}>
            🧾 Order Summary
          </h3>

          <div style={{ flex: 1 }}>
            {cart.items.map((item) => (
              <div key={item.productId} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '45px',
                      height: '45px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                  <div>
                    <p style={{
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      {item.title}
                    </p>
                    <p style={{ color: '#666', fontSize: '12px' }}>
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span style={{
                  color: '#f90',
                  fontWeight: '700'
                }}>
                  ₹{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div style={{
            borderTop: '1px solid rgba(255,153,0,0.2)',
            paddingTop: '20px',
            marginTop: '20px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <span style={{ color: '#888', fontSize: '16px' }}>Total</span>
              <span style={{
                color: '#f90',
                fontSize: '28px',
                fontWeight: '900'
              }}>
                ₹{total.toLocaleString()}
              </span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              style={{
                width: '100%',
                padding: '18px',
                background: 'linear-gradient(135deg, #f90, #ff6600)',
                border: 'none',
                borderRadius: '50px',
                fontSize: '18px',
                fontWeight: '800',
                cursor: 'pointer',
                color: 'black',
                boxShadow: '0 8px 25px rgba(255,153,0,0.4)'
              }}
            >
              {loading ? 'Placing Order...' : 'Place Order →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout