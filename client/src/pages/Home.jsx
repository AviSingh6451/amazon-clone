import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

function Home() {
  const { user } = useAuth()

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        backgroundColor: '#131921',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
          Welcome {user ? user.name : 'to Amazon Clone'}
        </h1>
        <p style={{ fontSize: '18px', marginBottom: '30px' }}>
          Find everything you need at the best prices
        </p>
        <Link to="/products" style={{
          backgroundColor: '#f90',
          color: 'black',
          padding: '15px 30px',
          borderRadius: '4px',
          textDecoration: 'none',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          Shop Now
        </Link>
      </div>

      {/* Categories Section */}
      <div style={{
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '30px' }}>Shop by Category</h2>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          {['Electronics', 'Clothing', 'Books', 'Home'].map((category) => (
            <Link
              key={category}
              to="/products"
              style={{
                backgroundColor: '#f0f0f0',
                padding: '20px 40px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'black',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home