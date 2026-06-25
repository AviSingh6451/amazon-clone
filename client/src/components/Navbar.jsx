import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav style={{
      backgroundColor: '#131921',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{
        color: 'white',
        fontSize: '24px',
        textDecoration: 'none',
        fontWeight: 'bold'
      }}>
        🛒 Amazon Clone
      </Link>

      <div style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
      }}>
        <Link to="/products" style={{
          color: 'white',
          textDecoration: 'none'
        }}>
          Products
        </Link>

        {user && (
          <Link to="/cart" style={{
            color: 'white',
            textDecoration: 'none',
            position: 'relative'
          }}>
            🛒 Cart
            {cartCount > 0 && (
              <span style={{
                backgroundColor: '#f90',
                color: 'black',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '12px',
                fontWeight: 'bold',
                marginLeft: '5px'
              }}>
                {cartCount}
              </span>
            )}
          </Link>
        )}

        {user ? (
          <>
            <span style={{ color: 'white' }}>
              Hello, {user.name}
            </span>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#f90',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              color: 'white',
              textDecoration: 'none'
            }}>
              Login
            </Link>
            <Link to="/signup" style={{
              backgroundColor: '#f90',
              color: 'black',
              padding: '8px 16px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar