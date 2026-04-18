import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const { btnLoading, registerUser } = UserData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    await registerUser(name, email, password, navigate);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-top-bar" />
        <div className="auth-logo">
          <span className="auth-logo-serif">E</span><div className="auth-logo-dot" /><span className="auth-logo-sans">Learn</span>
        </div>
        <h1 className="auth-heading">Get started.</h1>
        <p className="auth-sub">Create your free account today</p>

        <form onSubmit={submitHandler}>
          <div className="auth-field">
            <label className="auth-label">Full name</label>
            <div className="auth-input-wrap">
              <input className="auth-input" type="text" placeholder="Your name"
                value={name} onChange={e => setName(e.target.value)} required />
              <span className="field-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              </span>
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label">Email</label>
            <div className="auth-input-wrap">
              <input className="auth-input" type="email" placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)} required />
              <span className="field-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="2" y="4" width="20" height="16" rx="3" /><path d="M2 7l10 7 10-7" />
                </svg>
              </span>
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <div className="auth-input-wrap">
              <input className="auth-input" type={showPw ? "text" : "password"} placeholder="Min. 8 characters"
                value={password} onChange={e => setPassword(e.target.value)} required />
              <button type="button" className="pw-toggle" onClick={() => setShowPw(!showPw)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  {showPw
                    ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></>
                    : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
                  }
                </svg>
              </button>
            </div>
          </div>

          <button type="submit" disabled={btnLoading} className="auth-btn" style={{ marginTop: '0.25rem' }}>
            {btnLoading ? <><div className="auth-btn-spinner" /><span>Please wait…</span></> : "Create account"}
          </button>
        </form>

        <div className="auth-divider">
          <div className="auth-divider-line" /><span className="auth-divider-text">or</span><div className="auth-divider-line" />
        </div>
        <p className="auth-footer">Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
};

export default Register;