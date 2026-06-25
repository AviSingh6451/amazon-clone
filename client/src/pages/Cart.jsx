import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

function Cart() {
  const { cart, getCart, removeFromCart, updateQuantity } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate('/login')
    else getCart()
  }, [user])

  if (!cart || cart.items.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px'
      }}>
        <div style={{ fontSize: '80px' }}>🛒</div>
        <h2 style={{ color: '#fff', fontSize: '28px', fontWeight: '800' }}>
          Your cart is empty!
        </h2>
        <p style={{ color: '#666' }}>
          Add some products to get started
        </p>
        <Link to="/products" style={{
          background: 'linear-gradient(135deg, #f90, #ff6600)',
          color: 'black',
          padding: '14px 35px',
          borderRadius: '50px',
          textDecoration: 'none',
          fontWeight: '800',
          fontSize: '16px',
          boxShadow: '0 8px 25px rgba(255,153,0,0.4)'
        }}>
          Shop Now →
        </Link>
      </div>
    )
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )

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
          Your Selection
        </div>
        <h2 style={{
          fontSize: '42px',
          fontWeight: '800',
          color: '#fff'
        }}>
          Shopping Cart
        </h2>
      </div>

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        {/* Cart Items */}
        {cart.items.map((item) => (
          <div key={item.productId} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            transition: 'all 0.3s ease'
          }}
            onMouseOver={e => {
              e.currentTarget.style.border = '1px solid rgba(255,153,0,0.3)'
              e.currentTarget.style.background = 'rgba(255,153,0,0.05)'
            }}
            onMouseOut={e => {
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '90px',
                height: '90px',
                objectFit: 'cover',
                borderRadius: '12px'
              }}
            />

            <div style={{ flex: 1 }}>
              <h3 style={{
                color: '#fff',
                fontWeight: '700',
                fontSize: '16px',
                marginBottom: '5px'
              }}>
                {item.title}
              </h3>
              <p style={{
                color: '#f90',
                fontWeight: '800',
                fontSize: '18px'
              }}>
                ₹{item.price.toLocaleString()}
              </p>
            </div>

            {/* Quantity Controls */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(255,255,255,0.05)',
              padding: '8px 15px',
              borderRadius: '50px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <button
                onClick={() => updateQuantity(
                  item.productId, item.quantity - 1
                )}
                style={{
                  width: '28px',
                  height: '28px',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                −
              </button>
              <span style={{
                color: '#fff',
                fontWeight: '700',
                fontSize: '16px',
                minWidth: '20px',
                textAlign: 'center'
              }}>
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(
                  item.productId, item.quantity + 1
                )}
                style={{
                  width: '28px',
                  height: '28px',
                  backgroundColor: 'rgba(255,153,0,0.3)',
                  border: 'none',
                  borderRadius: '50%',
                  color: '#f90',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                +
              </button>
            </div>

            {/* Item Total */}
            <div style={{
              color: '#fff',
              fontWeight: '800',
              fontSize: '18px',
              minWidth: '100px',
              textAlign: 'right'
            }}>
              ₹{(item.price * item.quantity).toLocaleString()}
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.productId)}
              style={{
                background: 'rgba(255,68,68,0.1)',
                border: '1px solid rgba(255,68,68,0.3)',
                color: '#ff4444',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
          </div>
        ))}

        {/* Total and Checkout */}
        <div style={{
          background: 'rgba(255,153,0,0.05)',
          border: '1px solid rgba(255,153,0,0.2)',
          borderRadius: '20px',
          padding: '25px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '10px'
        }}>
          <div>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>
              Total Amount
            </p>
            <p style={{
              color: '#f90',
              fontSize: '32px',
              fontWeight: '900'
            }}>
              ₹{total.toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => navigate('/checkout')}
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
            Checkout →
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart