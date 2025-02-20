import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  notification,
  Space,
} from "antd";
import { UserOutlined, LockOutlined, HomeOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to get query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Request Password Reset Page
export const RequestPasswordResetPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string }) => {
    try {
      setLoading(true);
      await api.post(
        "http://localhost:5000/api/students/request-password-reset",
        {
          email: values.email,
        }
      );
      notification.success({
        message: "Request Sent",
        description:
          "If your email exists in our system, you will receive a password reset link shortly.",
      });
      form.resetFields();
    } catch (error) {
      notification.error({
        message: "Request Failed",
        description: "An error occurred while processing your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-900 via-blue-800 to-blue-400">
      <Card style={{ width: "100%", maxWidth: 500 }}>
        <div className="flex justify-between items-center mb-4">
          <Title level={3} style={{ margin: 0 }}>
            Reset Password
          </Title>
          <Button
            type="text"
            icon={<HomeOutlined />}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
        </div>
        <Text type="secondary">
          Enter your email address and we'll send you a link to reset your
          password.
        </Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: "100%" }}>
              <Button
                type="default"
                onClick={() => navigate("/student-login")}
                style={{ marginRight: 8 }}
              >
                Back to Login
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ flexGrow: 1 }}
              >
                Send Reset Link
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

// Reset Password Page (with token)
export const ResetPasswordPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const query = useQuery();
  const token = query.get("token");

  const handleSubmit = async (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      setLoading(true);
      await api.post("http://localhost:5000/api/students/reset-password", {
        token,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });

      notification.success({
        message: "Password Reset Successful",
        description:
          "Your password has been reset successfully! You will be redirected to login shortly.",
      });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/student-login");
      }, 2000);
    } catch (error: any) {
      notification.error({
        message: "Reset Failed",
        description:
          error.response?.data?.message ||
          "An error occurred during password reset. The link may be invalid or expired.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-900 via-blue-800 to-blue-400">
        <Card style={{ width: "100%", maxWidth: 500 }}>
          <Title level={3}>Invalid Request</Title>
          <Text type="danger">
            The password reset link is invalid or has expired.
          </Text>
          <Button
            type="primary"
            style={{ marginTop: 16 }}
            onClick={() => navigate("/request-password-reset")}
          >
            Request New Link
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-900 via-blue-800 to-blue-400">
      <Card style={{ width: "100%", maxWidth: 500 }}>
        <Title level={3}>Reset Your Password</Title>
        <Text type="secondary">Please enter your new password below.</Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginTop: 24 }}
        >
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="New Password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm New Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

// Email Verification Page
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
            <Button type="primary" onClick={() => navigate("/student-login")}>
              Proceed to Login
            </Button>
          </>
        ) : (
          <>
            <Text type="danger" style={{ display: "block", marginBottom: 16 }}>
              {errorMessage}
            </Text>
            <Button type="primary" onClick={() => navigate("/student-login")}>
              Back to Login
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};
