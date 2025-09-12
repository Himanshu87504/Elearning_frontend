import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../components/loading/Loading";
import { UserData } from "../../context/UserContext";

const PaymentSuccess = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const { fetchUser } = UserData();

  // Ref to ensure effect runs only once
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return; // Already ran, skip
    hasRun.current = true;

    const verifyPayment = async () => {
      const params = new URLSearchParams(window.location.search);
      const session_id = params.get("session_id");
      const courseId = params.get("courseId");
      setSessionId(session_id);

      const token = localStorage.getItem("token");

      try {
        const { data } = await axios.post(
          `${server}/api/verification/${courseId}`,
          { session_id },
          { headers: { token } }
        );

        if (data.success) {
          toast.success(data.message);
          await fetchUser();
          // Optionally navigate
          // navigate(`/course/study/${data.course._id}`);
        } else {
          toast.error("Payment verification failed");
        }
      } catch (error) {
        toast.error("Something went wrong-");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="payment-success-page">
      {user && (
        <div className="success-message">
          <h2>Payment successful</h2>
          <p>Verification Done</p>
          <p>
            <strong>Reference no:</strong> {sessionId}
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
