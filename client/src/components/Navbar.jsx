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
        fontSize: '26px',
        textDecoration: 'none',
        fontWeight: '800',
        letterSpacing: '1px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        ⚡ AmazonClone
      </Link>

      {/* Nav Links */}
      <div style={{
        display: 'flex',
        gap: '30px',
        alignItems: 'center'
      }}>
        <Link to="/products" style={{
          color: '#ccc',
          textDecoration: 'none',
          fontSize: '15px',
          fontWeight: '500',
          letterSpacing: '0.5px'
        }}
          onMouseOver={e => e.target.style.color = '#f90'}
          onMouseOut={e => e.target.style.color = '#ccc'}
        >
          Products
        </Link>

        {user && (
          <Link to="/cart" style={{
            color: '#ccc',
            textDecoration: 'none',
            fontSize: '15px',
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
                width: '22px',
                height: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '800'
              }}>
                {cartCount}
              </span>
            )}
          </Link>
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
                padding: '8px 20px',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '14px',
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
              fontSize: '15px'
            }}>
              Login
            </Link>
            <Link to="/signup" style={{
              background: 'linear-gradient(135deg, #f90, #ff6600)',
              color: 'black',
              padding: '10px 24px',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '14px',
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