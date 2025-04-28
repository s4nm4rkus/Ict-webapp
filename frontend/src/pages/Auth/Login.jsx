import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./login.css";
import "font-awesome/css/font-awesome.min.css";

function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await login(email, password); // get user

      // Redirect based on role
      if (loggedInUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError("Invalid email or password!");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="loginContainer">
      <div className="centered-div">
        <h2 className="logoText">LOGO</h2>
        <h2 className="loginTitle">Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Email Input */}

          <div className="inputContainer">
            <label htmlFor="email" className="inputLabelEmail">
              Email
            </label>
          </div>
          <input
            type="email"
            className="loginInput"
            id="email" // Corrected id
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}

          <div className="inputContainer">
            <label htmlFor="password" className="inputLabelPassword">
              Password
            </label>
          </div>
          <div className="loginInputOuter" style={{ display: "flex" }}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              className="loginInputInner"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="togglePasswordButton"
              onClick={togglePasswordVisibility}
            >
              <i
                className={
                  isPasswordVisible ? "fas fa-eye-slash eye" : "fas fa-eye eye"
                }
              />
            </button>
          </div>
          <button
            type="submit"
            className="loginButtonContainer"
            style={{
              backgroundColor: "transparent",
              border: "none",
              width: "100%",
              color: "white",
            }}
          >
            <h3 className="loginBtn">Login</h3>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
