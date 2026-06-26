import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Wishlist() {
  const [wishlist, setWishlist] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user, token } = useAuth()
  const { addToCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    fetchWishlist()
  }, [user])

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/wishlist',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setWishlist(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const removeFromWishlist = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/wishlist/remove/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setWishlist(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddToCart = async (item) => {
    await addToCart({
      _id: item.productId,
      title: item.title,
      price: item.price,
      image: item.image
    })
    await removeFromWishlist(item.productId)
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

  if (!wishlist || wishlist.items.length === 0) return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px'
    }}>
      <div style={{ fontSize: '80px' }}>🤍</div>
      <h2 style={{
        color: '#fff',
        fontSize: '28px',
        fontWeight: '800'
      }}>
        Your wishlist is empty!
      </h2>
      <p style={{ color: '#666' }}>
        Save items you love for later
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
        Browse Products →
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
          Saved Items
        </div>
        <h2 style={{
          fontSize: '42px',
          fontWeight: '800',
          color: '#fff'
        }}>
          My Wishlist ❤️
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '25px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {wishlist.items.map((item) => (
          <div key={item.productId} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}
            onMouseOver={e => {
              e.currentTarget.style.border = '1px solid rgba(255,153,0,0.4)'
              e.currentTarget.style.transform = 'translateY(-5px)'
            }}
            onMouseOut={e => {
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover'
              }}
            />
            <div style={{ padding: '20px' }}>
              <h3 style={{
                color: '#fff',
                fontWeight: '700',
                fontSize: '16px',
                marginBottom: '8px'
              }}>
                {item.title}
              </h3>
              <p style={{
                color: '#f90',
                fontWeight: '800',
                fontSize: '20px',
                marginBottom: '15px'
              }}>
                ₹{item.price.toLocaleString()}
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleAddToCart(item)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: 'linear-gradient(135deg, #f90, #ff6600)',
                    border: 'none',
                    borderRadius: '25px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    color: 'black',
                    fontSize: '14px'
                  }}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.productId)}
                  style={{
                    padding: '10px 15px',
                    background: 'rgba(255,68,68,0.1)',
                    border: '1px solid rgba(255,68,68,0.3)',
                    borderRadius: '25px',
                    color: '#ff4444',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist