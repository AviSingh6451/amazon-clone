import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function OrderHistory() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { user, token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    fetchOrders()
  }, [user])

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        'https://amazon-clone-backend-rpst.onrender.com/api/orders/history',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setOrders(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#f90',
      fontSize: '20px'
    }}>
      Loading...
    </div>
  )

  if (orders.length === 0) return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px'
    }}>
      <div style={{ fontSize: '80px' }}>📦</div>
      <h2 style={{
        color: '#fff',
        fontSize: '28px',
        fontWeight: '800'
      }}>
        No orders yet!
      </h2>
      <p style={{ color: '#666' }}>
        Your order history will appear here
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
        Start Shopping →
      </Link>
    </div>
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
          Your Purchases
        </div>
        <h2 style={{
          fontSize: '42px',
          fontWeight: '800',
          color: '#fff'
        }}>
          Order History 📦
        </h2>
      </div>

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {orders.map((order) => (
          <div key={order._id} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '25px',
            transition: 'all 0.3s ease'
          }}
            onMouseOver={e => {
              e.currentTarget.style.border = '1px solid rgba(255,153,0,0.3)'
            }}
            onMouseOut={e => {
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'
            }}
          >
            {/* Order Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              paddingBottom: '15px',
              borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}>
              <div>
                <p style={{
                  color: '#888',
                  fontSize: '13px',
                  marginBottom: '5px'
                }}>
                  Order ID
                </p>
                <p style={{
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: '14px'
                }}>
                  #{order._id.slice(-8).toUpperCase()}
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  color: '#888',
                  fontSize: '13px',
                  marginBottom: '5px'
                }}>
                  Date
                </p>
                <p style={{
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: '14px'
                }}>
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  color: '#888',
                  fontSize: '13px',
                  marginBottom: '5px'
                }}>
                  Status
                </p>
                <span style={{
                  background: 'rgba(0,200,83,0.1)',
                  border: '1px solid rgba(0,200,83,0.3)',
                  color: '#00c853',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '700'
                }}>
                  ✅ {order.status}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{
                  color: '#888',
                  fontSize: '13px',
                  marginBottom: '5px'
                }}>
                  Total
                </p>
                <p style={{
                  color: '#f90',
                  fontWeight: '900',
                  fontSize: '20px'
                }}>
                  ₹{order.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {order.items.map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '55px',
                      height: '55px',
                      objectFit: 'cover',
                      borderRadius: '10px'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{
                      color: '#fff',
                      fontWeight: '600',
                      fontSize: '15px'
                    }}>
                      {item.title}
                    </p>
                    <p style={{
                      color: '#666',
                      fontSize: '13px'
                    }}>
                      Qty: {item.quantity} ×
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                  <p style={{
                    color: '#f90',
                    fontWeight: '700',
                    fontSize: '16px'
                  }}>
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Delivery Address */}
            {order.address && (
              <div style={{
                marginTop: '20px',
                paddingTop: '15px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                color: '#555',
                fontSize: '13px'
              }}>
                📍 Delivered to: {order.address.street},
                {order.address.city}, {order.address.state} -
                {order.address.pincode}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderHistory