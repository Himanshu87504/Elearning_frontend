import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";
import ReCAPTCHA from "react-google-recaptcha";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [captchaDone, setCaptchaDone] = useState(false);
  const { btnLoading, verifyOtp } = UserData();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-top-bar" />
        <div className="auth-logo">
          <span className="auth-logo-serif">E</span><div className="auth-logo-dot" /><span className="auth-logo-sans">Learn</span>
        </div>
        <h1 className="auth-heading">Verify account.</h1>
        <p className="auth-sub">Enter the OTP sent to your email</p>

        <div className="auth-hint">
          A 6-digit code was sent to your registered email. It expires in 10 minutes.
        </div>

        <form onSubmit={submitHandler}>
          <div className="auth-field">
            <label className="auth-label">One-time password</label>
            <div className="auth-input-wrap">
              <input className="auth-input otp-input" type="number" placeholder="000000"
                value={otp} onChange={e => setOtp(e.target.value)} required />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={() => setCaptchaDone(true)}
              onExpired={() => setCaptchaDone(false)}
            />
          </div>

          {captchaDone && (
            <button disabled={btnLoading} type="submit" className="auth-btn">
              {btnLoading ? <><div className="auth-btn-spinner" /><span>Verifying…</span></> : "Verify account"}
            </button>
          )}
        </form>

        <div className="auth-divider">
          <div className="auth-divider-line" /><span className="auth-divider-text">or</span><div className="auth-divider-line" />
        </div>
        <p className="auth-footer">Back to <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Verify;