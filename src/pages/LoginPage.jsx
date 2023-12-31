import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const { handleLogin } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { username, password };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.status === 400) {
        const parsed = await response.json();
        throw new Error(parsed.message);
      }
      if (response.status === 200) {
        const parsed = await response.json();
        handleLogin(parsed.token);
        navigate(`/profile/${user.userId}`);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-page-container">
      <form onSubmit={handleSubmit}>
        <div className="login-page-input-container">
          <label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              className="login-page-username"
              placeholder="Username"
            />
          </label>
          <label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              className="login-page-password"
              placeholder="Password"
            />
          </label>
        </div>
        <button className="login-page-button" type="submit">Login</button>
      </form>
      <p>Create an account <Link className="login-page-create-account-link" to="/signup">here</Link></p>
    </div>
  );
};

export default LoginPage;
