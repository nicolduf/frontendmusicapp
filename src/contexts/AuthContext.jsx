import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)

  const handleLogin = async currentToken => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setUser(data)
        setToken(currentToken)
        setIsAuthenticated(true)
        window.localStorage.setItem('authToken', currentToken)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setIsAuthenticated(false)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const tokenFromStorage = window.localStorage.getItem('authToken')
    if (tokenFromStorage) {
      handleLogin(tokenFromStorage)
    } else {
      setIsLoading(false)
    }
  }, [])

  const fetchWithToken = async (endpoint, callback, method = 'GET', body) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      if (response.ok) {
        const parsed = await response.json()
        callback(parsed)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const removeToken = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  const logOutUser = () => {
    removeToken();
    const tokenFromStorage = window.localStorage.getItem('authToken')
    handleLogin(tokenFromStorage);
    console.log("hooooo")
  };

  return (
    <AuthContext.Provider value={{user, fetchWithToken, isLoading, isAuthenticated, handleLogin, logOutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;