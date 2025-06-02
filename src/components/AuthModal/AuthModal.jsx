import React, { useState } from "react";
import axios from "axios";
import "./AuthModal.css";

const API_URL = "http://localhost:5000";

export default function AuthModal({ onClose, onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let response;

      if (isSignUp) {
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }
        if (!agree) {
          setError("You must agree to the terms.");
          setLoading(false);
          return;
        }
        response = await axios.post(`${API_URL}/register`, {
          username,
          nickname,
          email,
          password,
        });
      } else {
        response = await axios.post(`${API_URL}/login`, {
          identifier: email || nickname,
          password,
        });
      }

      const { user, token } = response.data;
      onAuthSuccess({ ...user, token });

      setUsername("");
      setNickname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAgree(false);
    } catch (err) {
      setError(
        err.response?.data?.message || "Bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setLoading(false);
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
            <>
              <input
                type="text"
                placeholder="Name"
                required
                className="modal-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
              <input
                type="text"
                placeholder="Nickname"
                required
                className="modal-input"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                disabled={loading}
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="modal-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </>
          )}

          {!isSignUp && (
            <input
              type="text"
              placeholder="Email or Nickname"
              required
              className="modal-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          )}

          <input
            type="password"
            placeholder="Password"
            required
            className="modal-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          {isSignUp && (
            <>
              <input
                type="password"
                placeholder="Confirm Password"
                required
                className="modal-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
              <label className="modal-checkbox-label">
                <input
                  type="checkbox"
                  required
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  disabled={loading}
                />{" "}
                I agree to the terms and conditions
              </label>
            </>
          )}

          {error && <p className="modal-error">{error}</p>}

          <button type="submit" className="modal-submit-btn" disabled={loading}>
            {loading
              ? "Please wait..."
              : isSignUp
              ? "Create Account"
              : "Log In"}
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
              setEmail("");
              setNickname("");
              setPassword("");
              setConfirmPassword("");
              setAgree(false);
            }}
            disabled={loading}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
