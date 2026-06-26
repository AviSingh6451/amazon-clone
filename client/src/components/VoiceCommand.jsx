import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

function VoiceCommand() {
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [message, setMessage] = useState('')
  const recognitionRef = useRef(null)
  const isListeningRef = useRef(false)
  const navigate = useNavigate()
  const { addToCart, removeFromCart, cart, getCart } = useCart()
  const { user, logout } = useAuth()

  const speak = (text) => {
    setMessage(text)
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1
    utterance.pitch = 1
    window.speechSynthesis.speak(utterance)
  }

  const handleCommand = useCallback(async (command) => {
    console.log('Command received:', command)
    setTranscript(command)

    // NAVIGATION COMMANDS
    if (command.includes('home')) {
      speak('Going to home!')
      navigate('/')

    } else if (
      command.includes('product') ||
      command.includes('shop') ||
      command.includes('browse')
    ) {
      speak('Opening products!')
      navigate('/products')

    } else if (
      command.includes('cart') &&
      !command.includes('add') &&
      !command.includes('remove')
    ) {
      speak('Opening your cart!')
      navigate('/cart')

    } else if (
      command.includes('checkout') ||
      command.includes('place order') ||
      command.includes('buy now')
    ) {
      speak('Going to checkout!')
      navigate('/checkout')

    } else if (
      command.includes('wishlist') ||
      command.includes('wish list') ||
      command.includes('saved items')
    ) {
      speak('Opening your wishlist!')
      navigate('/wishlist')

    } else if (
      command.includes('order history') ||
      command.includes('my orders') ||
      command.includes('past orders')
    ) {
      speak('Opening your orders!')
      navigate('/orders')

    } else if (
      command.includes('login') ||
      command.includes('sign in')
    ) {
      speak('Going to login!')
      navigate('/login')

    } else if (
      command.includes('logout') ||
      command.includes('log out') ||
      command.includes('sign out')
    ) {
      speak('Logging you out!')
      logout()
      navigate('/login')

    } else if (
      command.includes('signup') ||
      command.includes('sign up') ||
      command.includes('register')
    ) {
      speak('Going to signup!')
      navigate('/signup')

    // ADD TO CART
    } else if (command.includes('add')) {
      let productName = command
        .replace('add', '')
        .replace('to my cart', '')
        .replace('to cart', '')
        .replace('in my cart', '')
        .replace('in cart', '')
        .replace('the', '')
        .trim()

      speak(`Looking for ${productName}`)

      try {
        const response = await axios.get(
          'http://localhost:5000/api/products'
        )
        const products = response.data
        const found = products.find(p => {
          const title = p.title.toLowerCase()
          const words = productName.split(' ')
          return words.some(word =>
            word.length > 2 && title.includes(word)
          )
        })

        if (found && user) {
          await addToCart(found)
          speak(`${found.title} added to your cart!`)
        } else if (!user) {
          speak('Please login first!')
          navigate('/login')
        } else {
          speak(`Sorry I could not find ${productName}`)
        }
      } catch (error) {
        speak('Something went wrong!')
      }

    // REMOVE FROM CART
    } else if (
      command.includes('remove') ||
      command.includes('delete')
    ) {
      let productName = command
        .replace('remove', '')
        .replace('delete', '')
        .replace('from my cart', '')
        .replace('from cart', '')
        .replace('the', '')
        .trim()

      if (cart && cart.items && cart.items.length > 0) {
        const found = cart.items.find(item => {
          const title = item.title.toLowerCase()
          const words = productName.split(' ')
          return words.some(word =>
            word.length > 2 && title.includes(word)
          )
        })
        if (found) {
          await removeFromCart(found.productId)
          speak(`${found.title} removed from cart!`)
        } else {
          speak(`Could not find ${productName} in your cart!`)
        }
      } else {
        speak('Your cart is empty!')
      }

    // SEARCH
    } else if (command.includes('search')) {
      const searchTerm = command.replace('search', '').trim()
      speak(`Searching for ${searchTerm}`)
      navigate(`/products?search=${searchTerm}`)

    // HELP
    } else if (
      command.includes('help') ||
      command.includes('what can you do')
    ) {
      speak('You can say: go home, open products, open cart, open wishlist, my orders, add iPhone to cart, remove shoes from cart, checkout, logout')

    } else {
      speak(`I did not understand. Say help to see all commands!`)
    }
  }, [cart, user, navigate, addToCart, removeFromCart, logout])

  const startListening = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      speak('Voice commands not supported. Please use Chrome!')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setMessage('Listening... speak now! 🎤')
    }

    recognition.onresult = async (event) => {
      const command = event.results[0][0].transcript.toLowerCase()
      await handleCommand(command)
    }

    recognition.onend = () => {
      // Auto restart if still listening
      if (isListeningRef.current) {
        setTimeout(() => {
          if (isListeningRef.current) {
            try {
              recognition.start()
            } catch (e) {
              console.log('Restart error:', e)
            }
          }
        }, 300)
      }
    }

    recognition.onerror = (event) => {
      if (event.error === 'no-speech') {
        // Silent - just restart, no error shown
        if (isListeningRef.current) {
          setTimeout(() => {
            try { recognition.start() } catch (e) {}
          }, 300)
        }
      } else if (event.error === 'not-allowed') {
        speak('Please allow microphone permission!')
        isListeningRef.current = false
        setListening(false)
      }
    }

    recognitionRef.current = recognition

    try {
      recognition.start()
    } catch (e) {
      console.log(e)
    }
  }, [handleCommand])

  const toggleListening = () => {
    if (listening) {
      isListeningRef.current = false
      setListening(false)
      recognitionRef.current?.stop()
      setMessage('')
      setTranscript('')
      window.speechSynthesis.cancel()
    } else {
      isListeningRef.current = true
      setListening(true)
      if (user) getCart()
      startListening()
    }
  }

  useEffect(() => {
    return () => {
      isListeningRef.current = false
      recognitionRef.current?.stop()
    }
  }, [])

  return (
    <>
      {/* Floating Mic Button */}
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
          zIndex: 9999,
          transition: 'all 0.3s ease',
          boxShadow: listening
            ? '0 0 0 8px rgba(255,68,68,0.3)'
            : '0 0 0 4px rgba(255,153,0,0.3)'
        }}
        title={listening ? 'Click to stop' : 'Click to start voice commands'}
      >
        {listening ? '🔴' : '🎤'}
      </button>

      {/* Status Box */}
      {(message || transcript) && (
        <div style={{
          position: 'fixed',
          bottom: '110px',
          right: '30px',
          background: 'rgba(10,10,10,0.97)',
          border: `1px solid ${listening
            ? 'rgba(255,68,68,0.4)'
            : 'rgba(255,153,0,0.3)'}`,
          borderRadius: '16px',
          padding: '20px 25px',
          maxWidth: '320px',
          zIndex: 9999,
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.6)'
        }}>
          {listening && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '10px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#ff4444',
                borderRadius: '50%',
                animation: 'blink 1s infinite'
              }} />
              <span style={{
                color: '#ff4444',
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                LIVE
              </span>
            </div>
          )}

          {transcript && (
            <p style={{
              color: '#666',
              fontSize: '13px',
              marginBottom: '8px'
            }}>
              You said: "{transcript}"
            </p>
          )}

          <p style={{
            color: '#fff',
            fontSize: '15px',
            fontWeight: '600',
            lineHeight: '1.4'
          }}>
            {message}
          </p>

          {listening && (
            <p style={{
              color: '#444',
              fontSize: '12px',
              marginTop: '10px'
            }}>
              Say "help" to see all commands
            </p>
          )}
        </div>
      )}

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </>
  )
}

export default VoiceCommand