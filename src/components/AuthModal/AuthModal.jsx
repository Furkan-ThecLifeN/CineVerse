import React, { useState } from "react";
import "./AuthModal.css";

export default function AuthModal({ onClose, onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignUp
      ? "http://localhost:5000/signup"
      : "http://localhost:5000/signin";

    const data = isSignUp ? { email, password, username } : { email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json();
        setError(errData.message || "Bir hata oluştu");
        return;
      }

      const resData = await response.json();
      onAuthSuccess(resData);
      onClose();
    } catch (error) {
      setError("Sunucuya bağlanırken hata oluştu");
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="modal-title">{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              placeholder="Username"
              required
              className="modal-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            required
            className="modal-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="modal-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="modal-error">{error}</p>}
          <button type="submit" className="modal-submit-btn">
            {isSignUp ? "Create Account" : "Log In"}
          </button>
        </form>
        <p className="modal-switch-text">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            className="modal-switch-btn"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
