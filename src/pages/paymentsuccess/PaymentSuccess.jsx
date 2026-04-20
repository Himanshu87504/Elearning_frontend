import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";
import { UserData } from "../../context/UserContext";
import { CourseData } from "../../context/CourseContext";
import "./paymentsuccess.css";

const CheckIcon = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
    <path
      d="M8 17.5l6.5 6.5 12-13"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M6.5 5.5l4 2.5-4 2.5V5.5Z" fill="currentColor" />
  </svg>
);

const DashboardIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <rect x="1" y="1" width="13" height="13" rx="3" stroke="currentColor" strokeWidth="1.2" />
    <path d="M5 5h5M5 7.5h5M5 10h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
    <path
      d="M3 9.5H2.5A1.5 1.5 0 0 1 1 8V2.5A1.5 1.5 0 0 1 2.5 1H8A1.5 1.5 0 0 1 9.5 2.5V3"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

const CheckSmallIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2 7l4 4 6-6"
      stroke="#1D9E75"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PaymentSuccess = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [copied, setCopied] = useState(false);
  const { fetchUser } = UserData();
  const { fetchMyCourse } = CourseData();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const verifyPayment = async () => {
      const params = new URLSearchParams(window.location.search);
      const session_id = params.get("session_id");
      const cId = params.get("courseId");

      setSessionId(session_id);
      setCourseId(cId);

      try {
        const { data } = await axios.post(
          `${server}/api/verification/${cId}`,
          { session_id },
          { headers: { token: localStorage.getItem("token") } }
        );

        if (data.success) {
          await fetchUser();
          await fetchMyCourse();
        } else {
          toast.error("Payment verification failed");
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, []);

  const handleCopy = () => {
    if (!sessionId) return;
    navigator.clipboard.writeText(sessionId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="ps-page">
      {user && (
        <div className="ps-card">
          {/* Gradient top bar */}
          <div className="ps-topbar" />

          {/* Confetti dots */}
          <div className="ps-dots">
            <span /><span /><span /><span /><span /><span /><span />
          </div>

          {/* Check icon */}
          <div className="ps-icon-ring">
            <CheckIcon />
          </div>

          {/* Badge */}
          <div className="ps-badge">
            <span className="ps-badge-dot" />
            Enrollment confirmed
          </div>

          {/* Heading */}
          <h2 className="ps-title">Payment successful</h2>
          <p className="ps-sub">
            Your course access is active.<br />
            You can start learning right away.
          </p>

          {/* Reference */}
          {sessionId && (
            <div className="ps-ref-box">
              <div className="ps-ref-left">
                <div className="ps-ref-label">Reference no.</div>
                <div className="ps-ref-val">{sessionId}</div>
              </div>
              <button className="ps-copy-btn" onClick={handleCopy} title="Copy reference">
                {copied ? <CheckSmallIcon /> : <CopyIcon />}
              </button>
            </div>
          )}

          <div className="ps-divider" />

          {/* Actions */}
          <div className="ps-actions">
            {courseId && (
              <Link to={`/course/study/${courseId}`} className="ps-btn-primary">
                <PlayIcon />
                Start learning
              </Link>
            )}
            <Link to="/account" className="ps-btn-secondary">
              <DashboardIcon />
              Go to dashboard
            </Link>
          </div>

          {/* Footer note */}
          <div className="ps-footer-note">
            <span>Secured by Stripe</span>
            <span className="ps-footer-dot" />
            <span>Receipt sent to your email</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
