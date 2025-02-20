import { Button, Card, Typography } from "antd";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const VerifyEmailPage: React.FC = () => {
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const query = useQuery();
  const token = query.get("token");

  React.useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setVerifying(false);
        setSuccess(false);
        setErrorMessage("Invalid verification token");
        return;
      }

      try {
        const response = await api.get(
          `http://localhost:5000/api/students/verify-email?token=${token}`
        );
        setSuccess(true);
      } catch (error: any) {
        setSuccess(false);
        setErrorMessage(
          error.response?.data?.message ||
            "Email verification failed. The link may be invalid or expired."
        );
      } finally {
        setVerifying(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-900 via-blue-800 to-blue-400">
      <Card style={{ width: "100%", maxWidth: 500 }}>
        <Title level={3}>Email Verification</Title>
        {verifying ? (
          <Text>Verifying your email...</Text>
        ) : success ? (
          <>
            <Text type="success" style={{ display: "block", marginBottom: 16 }}>
              Your email has been verified successfully!
            </Text>
            <Button type="primary" onClick={() => navigate("/login")}>
              Proceed to Login
            </Button>
          </>
        ) : (
          <>
            <Text type="danger" style={{ display: "block", marginBottom: 16 }}>
              {errorMessage}
            </Text>
            <Button type="primary" onClick={() => navigate("/login")}>
              Back to Login
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};
