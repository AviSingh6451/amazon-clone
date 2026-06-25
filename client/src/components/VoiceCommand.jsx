import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

function VoiceCommand() {
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [message, setMessage] = useState('')
  const [show, setShow] = useState(false)
  const recognitionRef = useRef(null)

  const navigate = useNavigate()
  const { addToCart, removeFromCart, cart, getCart } = useCart()
  const { user, logout } = useAuth()

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setMessage('Voice not supported. Use Chrome!')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onresult = async (event) => {
      const command = event.results[0][0].transcript.toLowerCase()
      setTranscript(command)
      await handleCommand(command)
    }

    recognition.onend = () => setListening(false)
    recognition.onerror = () => {
      setListening(false)
      setMessage('Could not hear you. Try again!')
    }

    recognitionRef.current = recognition
  }, [cart, user])

  const handleCommand = async (command) => {
    setShow(true)

    // GO HOME
    if (command.includes('go home') || command.includes('home page')) {
      setMessage('Going to Home! 🏠')
      navigate('/')

    // GO TO PRODUCTS
    } else if (command.includes('products') || command.includes('shop')) {
      setMessage('Opening Products! 🛍️')
      navigate('/products')

    // GO TO CART
    } else if (command.includes('go to cart') || command.includes('open cart') || command.includes('my cart')) {
      setMessage('Opening Cart! 🛒')
      navigate('/cart')

    // GO TO CHECKOUT
    } else if (command.includes('checkout') || command.includes('place order')) {
      setMessage('Going to Checkout! 💳')
      navigate('/checkout')

    // LOGOUT
    } else if (command.includes('logout') || command.includes('log out') || command.includes('sign out')) {
      setMessage('Logging out! 👋')
      logout()
      navigate('/login')

    // LOGIN
    } else if (command.includes('login') || command.includes('sign in')) {
      setMessage('Going to Login! 🔑')
      navigate('/login')

    // SEARCH PRODUCT
    } else if (command.includes('search')) {
      const searchTerm = command.replace('search', '').trim()
      setMessage(`Searching for "${searchTerm}"! 🔍`)
      navigate(`/products?search=${searchTerm}`)

    // ADD TO CART
    } else if (command.includes('add') && command.includes('cart')) {
      const productName = command
        .replace('add', '')
        .replace('to cart', '')
        .replace('to my cart', '')
        .trim()

      setMessage(`Looking for "${productName}"... 🔍`)

      try {
        const response = await axios.get('http://localhost:5000/api/products')
        const products = response.data
        const found = products.find(p =>
          p.title.toLowerCase().includes(productName)
        )

        if (found && user) {
          await addToCart(found)
          setMessage(`✅ "${found.title}" added to cart!`)
        } else if (!user) {
          setMessage('Please login first! 🔑')
          navigate('/login')
        } else {
          setMessage(`❌ Product "${productName}" not found!`)
        }
      } catch (error) {
        setMessage('Something went wrong!')
      }

    // REMOVE FROM CART
    } else if (command.includes('remove') && command.includes('cart')) {
      const productName = command
        .replace('remove', '')
        .replace('from cart', '')
        .replace('from my cart', '')
        .trim()

      if (cart && cart.items) {
        const found = cart.items.find(item =>
          item.title.toLowerCase().includes(productName)
        )
        if (found) {
          await removeFromCart(found.productId)
          setMessage(`✅ "${found.title}" removed from cart!`)
        } else {
          setMessage(`❌ "${productName}" not found in cart!`)
        }
      } else {
        setMessage('Your cart is empty!')
      }

    // GO TO SIGNUP
    } else if (command.includes('signup') || command.includes('sign up') || command.includes('register')) {
      setMessage('Going to Signup! 🚀')
      navigate('/signup')

    // UNKNOWN COMMAND
    } else {
      setMessage(`❓ Command "${command}" not recognized!`)
    }

    setTimeout(() => {
      setShow(false)
      setTranscript('')
      setMessage('')
    }, 3000)
  }

  const toggleListening = () => {
    if (listening) {
      recognitionRef.current?.stop()
      setListening(false)
    } else {
      if (cart && user) getCart()
      recognitionRef.current?.start()
      setListening(true)
      setShow(true)
      setMessage('Listening... speak now! 🎤')
    }
  }

  return (
    <>
      {/* Voice Button */}
      <button
        onClick={toggleListening}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '65px',
          height: '65px',
          borderRadius: '50%',
          background: listening
            ? 'linear-gradient(135deg, #ff4444, #cc0000)'
            : 'linear-gradient(135deg, #f90, #ff6600)',
          border: 'none',
          cursor: 'pointer',
          fontSize: '28px',
          boxShadow: listening
            ? '0 0 0 8px rgba(255,68,68,0.3), 0 8px 25px rgba(255,68,68,0.5)'
            : '0 0 0 4px rgba(255,153,0,0.3), 0 8px 25px rgba(255,153,0,0.4)',
          zIndex: 9999,
          transition: 'all 0.3s ease',
          animation: listening ? 'pulse 1s infinite' : 'none'
        }}
        title="Voice Command"
      >
        {listening ? '🔴' : '🎤'}
      </button>

      {/* Command Display */}
      {show && (
        <div style={{
          position: 'fixed',
          bottom: '110px',
          right: '30px',
          background: 'rgba(10,10,10,0.95)',
          border: '1px solid rgba(255,153,0,0.3)',
          borderRadius: '16px',
          padding: '20px 25px',
          maxWidth: '300px',
          zIndex: 9999,
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
        }}>
          {transcript && (
            <p style={{
              color: '#888',
              fontSize: '13px',
              marginBottom: '8px'
            }}>
              You said: "{transcript}"
            </p>
          )}
          <p style={{
            color: '#fff',
            fontSize: '15px',
            fontWeight: '600'
          }}>
            {message}
          </p>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255,68,68,0.4); }
          70% { box-shadow: 0 0 0 15px rgba(255,68,68,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,68,68,0); }
        }
      `}</style>
    </>
  )
}

export default VoiceCommand