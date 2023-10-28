import { useState } from 'react'
import "../styles/Signup.css"

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    const payload = { username, password }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (response.status === 201) {
        const parsed = await response.json()
        console.log(parsed)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="form-container-su">
      <form onSubmit={handleSubmit}>
        <div className="input-container-su">
          <label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              className="username-button-su"
              placeholder="Username"
            />
          </label>
          <label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              className="password-button-su"
              placeholder="Password"
            />
          </label>
        </div>
        <button className="login-button-su" type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignupPage