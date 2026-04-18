import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/forgot`, { email });
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-top-bar" />
        <div className="auth-logo">
          <span className="auth-logo-serif">E</span><div className="auth-logo-dot" /><span className="auth-logo-sans">Learn</span>
        </div>
        <h1 className="auth-heading">Forgot password?</h1>
        <p className="auth-sub">We'll send a reset link to your email</p>

        <div className="auth-hint">
          Enter the email address linked to your account and we'll send you a reset link.
        </div>

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label">Email address</label>
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

          <button disabled={btnLoading} className="auth-btn">
            {btnLoading ? <><div className="auth-btn-spinner" /><span>Sending…</span></> : "Send reset link"}
          </button>
        </form>

        <div className="auth-divider">
          <div className="auth-divider-line" /><span className="auth-divider-text">or</span><div className="auth-divider-line" />
        </div>
        <p className="auth-footer">Remember it? <Link to="/login">Back to login</Link></p>
      </div>
    </div>
  );
};

export default ForgotPassword;