import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

function Cart() {
  const { cart, getCart, removeFromCart, updateQuantity } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      getCart()
    }
  }, [user])

  if (!cart || cart.items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Your cart is empty!</h2>
        <Link to="/products" style={{
          backgroundColor: '#f90',
          color: 'black',
          padding: '10px 20px',
          borderRadius: '4px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          Shop Now
        </Link>
      </div>
    )
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>Your Cart</h2>

      {cart.items.map((item) => (
        <div key={item.productId} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          padding: '15px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          marginBottom: '15px',
          backgroundColor: 'white'
        }}>
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'cover',
              borderRadius: '4px'
            }}
          />

          <div style={{ flex: 1 }}>
            <h3>{item.title}</h3>
            <p style={{ color: '#B12704', fontWeight: 'bold' }}>
              ₹{item.price}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '18px'
              }}
            >
              -
            </button>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '18px'
              }}
            >
              +
            </button>
          </div>

          <p style={{ fontWeight: 'bold', minWidth: '80px' }}>
            ₹{item.price * item.quantity}
          </p>

          <button
            onClick={() => removeFromCart(item.productId)}
            style={{
              backgroundColor: '#ff4444',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Remove
          </button>
        </div>
      ))}

      <div style={{
        textAlign: 'right',
        padding: '20px',
        borderTop: '2px solid #ddd',
        marginTop: '20px'
      }}>
        <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>
          Total: ₹{total}
        </h3>
        <button
          onClick={() => navigate('/checkout')}
          style={{
            backgroundColor: '#f90',
            border: 'none',
            padding: '15px 40px',
            borderRadius: '4px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart
