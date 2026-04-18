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
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path
      d="M7 16.5l6 6 12-12"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
    <path d="M6.5 5.5l4 2.5-4 2.5V5.5Z" fill="currentColor" />
  </svg>
);

const PaymentSuccess = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [courseId, setCourseId] = useState(null);
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

  if (loading) return <Loading />;

  return (
    <div className="payment-success-page">
      {user && (
        <div className="success-card">
          {/* Confetti dots */}
          <div className="confetti-row">
            <span /><span /><span /><span /><span />
          </div>

          {/* Check icon */}
          <div className="success-icon-wrap">
            <CheckIcon />
          </div>

          {/* Heading */}
          <h2>Payment Successful!</h2>
          <p className="success-sub">
            Your enrollment is confirmed.<br />
            You can start learning right away.
          </p>

          {/* Reference */}
          {sessionId && (
            <div className="reference-box">
              <span className="ref-label">Reference No.</span>
              <span className="ref-value">{sessionId}</span>
            </div>
          )}

          <div className="success-divider" />

          {/* Actions */}
          <div className="success-actions">
            {courseId && (
              <Link to={`/course/study/${courseId}`} className="btn-primary">
                <PlayIcon />
                Start Learning
              </Link>
            )}
            <Link to="/account" className="btn-secondary">
              Go to Dashboard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;