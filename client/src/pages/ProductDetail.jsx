import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const [reviews] = useState([
    { name: 'Rahul S.', rating: 5, comment: 'Amazing product! Totally worth it.', date: '2 days ago' },
    { name: 'Priya M.', rating: 4, comment: 'Great quality, fast delivery!', date: '1 week ago' },
    { name: 'Amit K.', rating: 5, comment: 'Best purchase this year!', date: '2 weeks ago' }
  ])

  const { addToCart } = useCart()
  const { user, token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        )
        setProduct(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = async () => {
    if (!user) { navigate('/login'); return }
    await addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleWishlist = async () => {
    if (!user) { navigate('/login'); return }
    try {
      await axios.post(
        'http://localhost:5000/api/wishlist/add',
        {
          productId: product._id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setWishlisted(true)
    } catch (error) {
      setWishlisted(true)
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

  if (!product) return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff'
    }}>
      Product not found!
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      padding: '40px'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto'
      }}>

        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#888',
            padding: '10px 20px',
            borderRadius: '25px',
            cursor: 'pointer',
            marginBottom: '30px',
            fontSize: '14px'
          }}
        >
          ← Back to Products
        </button>

        {/* Product Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '50px',
          marginBottom: '60px'
        }}>
          {/* Image */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px',
            overflow: 'hidden'
          }}>
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Details */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '20px'
          }}>
            <div style={{
              background: 'rgba(255,153,0,0.1)',
              border: '1px solid rgba(255,153,0,0.2)',
              color: '#f90',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '700',
              width: 'fit-content'
            }}>
              {product.category}
            </div>

            <h1 style={{
              fontSize: '36px',
              fontWeight: '900',
              color: '#fff',
              lineHeight: '1.2'
            }}>
              {product.title}
            </h1>

            <div style={{ display: 'flex', gap: '5px' }}>
              {'⭐'.repeat(5)}
              <span style={{ color: '#888', fontSize: '14px', marginLeft: '5px' }}>
                (4.8 · 128 reviews)
              </span>
            </div>

            <p style={{
              color: '#888',
              fontSize: '16px',
              lineHeight: '1.7'
            }}>
              {product.description}
            </p>

            <div style={{
              fontSize: '42px',
              fontWeight: '900',
              color: '#f90'
            }}>
              ₹{product.price.toLocaleString()}
            </div>

            <div style={{
              display: 'flex',
              gap: '15px',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  padding: '16px',
                  background: added
                    ? 'linear-gradient(135deg, #00c853, #00a040)'
                    : 'linear-gradient(135deg, #f90, #ff6600)',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '16px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  color: 'black',
                  boxShadow: '0 8px 25px rgba(255,153,0,0.4)'
                }}
              >
                {added ? '✅ Added to Cart!' : '🛒 Add to Cart'}
              </button>

              <button
                onClick={handleWishlist}
                style={{
                  padding: '16px 20px',
                  background: wishlisted
                    ? 'rgba(255,68,68,0.2)'
                    : 'rgba(255,255,255,0.05)',
                  border: wishlisted
                    ? '1px solid rgba(255,68,68,0.5)'
                    : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '50px',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: wishlisted ? '#ff4444' : '#888'
                }}
              >
                {wishlisted ? '❤️' : '🤍'}
              </button>
            </div>

            {/* Features */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginTop: '10px'
            }}>
              {[
                { icon: '🚚', text: 'Free Delivery' },
                { icon: '↩️', text: '30 Day Returns' },
                { icon: '🔒', text: 'Secure Payment' },
                { icon: '⭐', text: 'Top Rated' }
              ].map((f) => (
                <div key={f.text} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#888',
                  fontSize: '13px'
                }}>
                  <span>{f.icon}</span>
                  {f.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '800',
            color: '#fff',
            marginBottom: '25px'
          }}>
            Customer Reviews
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            {reviews.map((review, index) => (
              <div key={index} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #f90, #ff6600)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      color: 'black',
                      fontSize: '16px'
                    }}>
                      {review.name[0]}
                    </div>
                    <div>
                      <p style={{
                        color: '#fff',
                        fontWeight: '700',
                        fontSize: '15px'
                      }}>
                        {review.name}
                      </p>
                      <p style={{ color: '#555', fontSize: '12px' }}>
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <div style={{ fontSize: '16px' }}>
                    {'⭐'.repeat(review.rating)}
                  </div>
                </div>
                <p style={{
                  color: '#888',
                  fontSize: '15px',
                  lineHeight: '1.6'
                }}>
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail