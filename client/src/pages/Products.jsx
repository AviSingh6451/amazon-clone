import { useState, useEffect } from 'react'
import axios from 'axios'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [addedId, setAddedId] = useState(null)

  const { addToCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/products'
        )
        setProducts(response.data)
      } catch (err) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleAddToCart = async (product) => {
    if (!user) {
      navigate('/login')
      return
    }
    await addToCart(product)
    setAddedId(product._id)
    setTimeout(() => setAddedId(null), 2000)
  }

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      Loading products...
    </div>
  )

  if (error) return (
    <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
      {error}
    </div>
  )

  if (products.length === 0) return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>No products yet!</h2>
    </div>
  )

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ marginBottom: '20px' }}>All Products</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        {products.map((product) => (
          <div key={product._id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            backgroundColor: 'white'
          }}>
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '4px'
              }}
            />
            <h3 style={{ marginTop: '10px' }}>{product.title}</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>
              {product.description}
            </p>
            <p style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#B12704'
            }}>
              ₹{product.price}
            </p>
            <button
              onClick={() => handleAddToCart(product)}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: addedId === product._id ? 'green' : '#f90',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '10px',
                color: addedId === product._id ? 'white' : 'black'
              }}
            >
              {addedId === product._id ? '✅ Added!' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products