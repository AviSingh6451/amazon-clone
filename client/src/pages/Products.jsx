import { useState, useEffect } from 'react'
import axios from 'axios'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [addedId, setAddedId] = useState(null)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const { addToCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home']

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://amazon-clone-backend-rpst.onrender.com/api/products')
        setProducts(response.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleAddToCart = async (e, product) => {
    e.stopPropagation()
    if (!user) { navigate('/login'); return }
    await addToCart(product)
    setAddedId(product._id)
    setTimeout(() => setAddedId(null), 2000)
  }

  const filtered = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory
    return matchesSearch && matchesCategory
  })

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
      Loading products...
    </div>
  )

  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
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
          Explore
        </div>
        <h2 style={{
          fontSize: '42px',
          fontWeight: '800',
          color: '#fff',
          marginBottom: '30px'
        }}>
          All Products
        </h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍  Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '500px',
            padding: '15px 25px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50px',
            color: '#fff',
            fontSize: '16px',
            outline: 'none',
            marginBottom: '30px'
          }}
        />

        {/* Category Filter */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '10px 24px',
                borderRadius: '50px',
                border: activeCategory === cat
                  ? 'none'
                  : '1px solid rgba(255,255,255,0.1)',
                background: activeCategory === cat
                  ? 'linear-gradient(135deg, #f90, #ff6600)'
                  : 'rgba(255,255,255,0.03)',
                color: activeCategory === cat ? 'black' : '#888',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: 'center',
          color: '#666',
          padding: '50px',
          fontSize: '18px'
        }}>
          No products found in this category
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '25px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {filtered.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/products/${product._id}`)}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={e => {
                e.currentTarget.style.border = '1px solid rgba(255,153,0,0.4)'
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: '#f90',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '700',
                  backdropFilter: 'blur(10px)'
                }}>
                  {product.category}
                </div>
              </div>

              <div style={{ padding: '20px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#fff',
                  marginBottom: '8px'
                }}>
                  {product.title}
                </h3>
                <p style={{
                  color: '#666',
                  fontSize: '14px',
                  marginBottom: '15px',
                  lineHeight: '1.5'
                }}>
                  {product.description}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: '24px',
                    fontWeight: '800',
                    color: '#f90'
                  }}>
                    ₹{product.price.toLocaleString()}
                  </span>
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    style={{
                      background: addedId === product._id
                        ? 'linear-gradient(135deg, #00c853, #00a040)'
                        : 'linear-gradient(135deg, #f90, #ff6600)',
                      color: 'black',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '25px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    {addedId === product._id ? '✅ Added!' : '+ Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Products