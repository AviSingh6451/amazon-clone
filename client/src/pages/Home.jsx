import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

function Home() {
  const { user } = useAuth()

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>

      {/* Hero Section */}
      <div style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '40px 20px',
        background: 'radial-gradient(ellipse at center, #1a0a00 0%, #0a0a0a 70%)',
        position: 'relative',
        overflow: 'hidden'
      }}>

        {/* Glowing orb background */}
        <div style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255,153,0,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          fontSize: '14px',
          color: '#f90',
          letterSpacing: '4px',
          fontWeight: '600',
          marginBottom: '20px',
          textTransform: 'uppercase'
        }}>
          Welcome to the future of shopping
        </div>

        <h1 style={{
          fontSize: '72px',
          fontWeight: '900',
          lineHeight: '1.1',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f90 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {user ? `Welcome back,\n${user.name}!` : 'Shop Smarter.\nLive Better.'}
        </h1>

        <p style={{
          fontSize: '18px',
          color: '#888',
          marginBottom: '40px',
          maxWidth: '500px',
          lineHeight: '1.6'
        }}>
          Discover millions of products at unbeatable prices.
          Fast delivery, easy returns, and 24/7 support.
        </p>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/products" style={{
            background: 'linear-gradient(135deg, #f90, #ff6600)',
            color: 'black',
            padding: '18px 45px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: '800',
            boxShadow: '0 8px 30px rgba(255, 153, 0, 0.5)',
            letterSpacing: '0.5px'
          }}>
            Shop Now →
          </Link>

          {!user && (
            <Link to="/signup" style={{
              background: 'transparent',
              color: '#fff',
              padding: '18px 45px',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '18px',
              fontWeight: '700',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              Create Account
            </Link>
          )}
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: '60px',
          marginTop: '80px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {[
            { number: '10M+', label: 'Products' },
            { number: '5M+', label: 'Customers' },
            { number: '99%', label: 'Satisfaction' }
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '36px',
                fontWeight: '800',
                color: '#f90'
              }}>
                {stat.number}
              </div>
              <div style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div style={{ padding: '80px 40px', textAlign: 'center' }}>
        <div style={{
          fontSize: '13px',
          color: '#f90',
          letterSpacing: '3px',
          marginBottom: '15px',
          textTransform: 'uppercase'
        }}>
          Browse
        </div>
        <h2 style={{
          fontSize: '42px',
          fontWeight: '800',
          marginBottom: '50px',
          color: '#fff'
        }}>
          Shop by Category
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {[
            { name: 'Electronics', icon: '📱' },
            { name: 'Clothing', icon: '👕' },
            { name: 'Books', icon: '📚' },
            { name: 'Home', icon: '🏠' }
          ].map((category) => (
            <Link
              key={category.name}
              to="/products"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '40px 20px',
                borderRadius: '20px',
                textDecoration: 'none',
                color: '#fff',
                fontWeight: '700',
                fontSize: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={e => {
                e.currentTarget.style.border = '1px solid rgba(255,153,0,0.5)'
                e.currentTarget.style.background = 'rgba(255,153,0,0.08)'
                e.currentTarget.style.transform = 'translateY(-5px)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span style={{ fontSize: '40px' }}>{category.icon}</span>
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div style={{
        padding: '60px 40px',
        background: 'rgba(255,153,0,0.03)',
        borderTop: '1px solid rgba(255,153,0,0.1)',
        borderBottom: '1px solid rgba(255,153,0,0.1)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          {[
            { icon: '🚚', title: 'Free Delivery', desc: 'On orders above ₹499' },
            { icon: '🔒', title: 'Secure Payment', desc: '100% secure transactions' },
            { icon: '↩️', title: 'Easy Returns', desc: '30 day return policy' },
            { icon: '💬', title: '24/7 Support', desc: 'Always here for you' }
          ].map((feature) => (
            <div key={feature.title}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>
                {feature.icon}
              </div>
              <div style={{
                fontWeight: '700',
                fontSize: '16px',
                marginBottom: '5px'
              }}>
                {feature.title}
              </div>
              <div style={{ color: '#666', fontSize: '14px' }}>
                {feature.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home