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
      background: 'rgba(10, 10, 10, 0.95)',
      backdropFilter: 'blur(20px)',
      padding: '15px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid rgba(255, 153, 0, 0.2)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
    }}>

      {/* Logo */}
      <Link to="/" style={{
        color: '#f90',
        fontSize: '24px',
        textDecoration: 'none',
        fontWeight: '800',
        letterSpacing: '1px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        ⚡ AmazonClone
      </Link>

      {/* Nav Links */}
      <div style={{
        display: 'flex',
        gap: '25px',
        alignItems: 'center'
      }}>
        <Link to="/products" style={{
          color: '#ccc',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '500'
        }}
          onMouseOver={e => e.target.style.color = '#f90'}
          onMouseOut={e => e.target.style.color = '#ccc'}
        >
          Products
        </Link>

        {user && (
          <>
            <Link to="/wishlist" style={{
              color: '#ccc',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500'
            }}
              onMouseOver={e => e.target.style.color = '#f90'}
              onMouseOut={e => e.target.style.color = '#ccc'}
            >
              ❤️ Wishlist
            </Link>

            <Link to="/orders" style={{
              color: '#ccc',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500'
            }}
              onMouseOver={e => e.target.style.color = '#f90'}
              onMouseOut={e => e.target.style.color = '#ccc'}
            >
              📦 Orders
            </Link>

            <Link to="/cart" style={{
              color: '#ccc',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
              onMouseOver={e => e.target.style.color = '#f90'}
              onMouseOut={e => e.target.style.color = '#ccc'}
            >
              🛒
              {cartCount > 0 && (
                <span style={{
                  backgroundColor: '#f90',
                  color: 'black',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: '800'
                }}>
                  {cartCount}
                </span>
              )}
            </Link>
          </>
        )}

        {user ? (
          <>
            <span style={{
              color: '#f90',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Hey, {user.name} 👋
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: '1px solid #f90',
                color: '#f90',
                padding: '8px 18px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{
              color: '#ccc',
              textDecoration: 'none',
              fontSize: '14px'
            }}>
              Login
            </Link>
            <Link to="/signup" style={{
              background: 'linear-gradient(135deg, #f90, #ff6600)',
              color: 'black',
              padding: '10px 22px',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '13px',
              boxShadow: '0 4px 15px rgba(255, 153, 0, 0.4)'
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