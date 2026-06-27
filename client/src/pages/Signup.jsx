import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await axios.post(
        'https://amazon-clone-backend-rpst.onrender.com/api/auth/signup',
        { name, email, password }
      )
      login(response.data.user, response.data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        position: 'fixed',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(255,153,0,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px',
        padding: '40px',
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <div style={{ fontSize: '40px', marginBottom: '15px' }}>🚀</div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '800',
            color: '#fff',
            marginBottom: '8px'
          }}>
            Create Account
          </h2>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Join millions of happy shoppers
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: 'rgba(255,68,68,0.1)',
            border: '1px solid rgba(255,68,68,0.3)',
            color: '#ff4444',
            padding: '12px',
            borderRadius: '10px',
            marginBottom: '20px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {[
            { label: 'Name', value: name, setter: setName, type: 'text', placeholder: 'Your full name' },
            { label: 'Email', value: email, setter: setEmail, type: 'email', placeholder: 'you@example.com' },
            { label: 'Password', value: password, setter: setPassword, type: 'password', placeholder: '••••••••' }
          ].map((field) => (
            <div key={field.label} style={{ marginBottom: '20px' }}>
              <label style={{
                color: '#888',
                fontSize: '13px',
                fontWeight: '600',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px'
              }}>
                {field.label}
              </label>
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                required
                placeholder={field.placeholder}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '15px',
                  outline: 'none'
                }}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #f90, #ff6600)',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '800',
              cursor: 'pointer',
              color: 'black',
              boxShadow: '0 8px 25px rgba(255,153,0,0.4)',
              marginTop: '10px'
            }}
          >
            {loading ? 'Creating Account...' : 'Create Account →'}
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          marginTop: '25px',
          color: '#666',
          fontSize: '14px'
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{
            color: '#f90',
            fontWeight: '700',
            textDecoration: 'none'
          }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup