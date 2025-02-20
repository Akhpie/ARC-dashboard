import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Steps,
  Alert,
  Typography,
  Space,
  notification,
  message,
  Tooltip,
} from "antd";
import axios from "axios";
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  RightOutlined,
  LeftOutlined,
  HomeOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Link } from "lucide-react";

// MoveHorizontal icon implementation
interface IconProps {
  color?: string;
  size?: number;
}

const MoveHorizontal: React.FC<IconProps> = ({
  color = "currentColor",
  size = 24,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="18 8 22 12 18 16"></polyline>
    <polyline points="6 8 2 12 6 16"></polyline>
    <line x1="2" y1="12" x2="22" y2="12"></line>
  </svg>
);

const { Title, Text } = Typography;
const { Step } = Steps;

// Custom gradient button component with proper TypeScript types
interface GradientButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  onClick,
  children,
  className = "",
}) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center px-1 py-0 rounded-md transition-all duration-300 bg-gradient-to-r from-blue-700 to-purple-600 hover:from-blue-800 hover:to-purple-700 active:from-blue-900 active:to-purple-800 ${className}`}
  >
    {children}
  </button>
);

// API helper functions
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const authInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

authInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication API methods
const authApi = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post(
        "http://localhost:5000/api/students/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },
  register: async (userData: any) => {
    try {
      const response = await api.post(
        "http://localhost:5000/api/students/register",
        userData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },
  updatePassword: async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    try {
      const response = await authInstance.put(
        "http://localhost:5000/api/students/change-password",
        {
          currentPassword,
          newPassword,
          confirmPassword,
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Password update failed"
      );
    }
  },
  getProfile: async () => {
    try {
      const response = await authInstance.get(
        "http://localhost:5000/api/students/profile"
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  },
};

interface LoginPageProps {
  onSwitchToRegister: () => void;
  onGoHome: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({
  onSwitchToRegister,
  onGoHome,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      await authApi.login(values.email, values.password);
      message.success("Login successful!");
      navigate("/student-dashboard"); // Redirect to dashboard after successful login
    } catch (error: any) {
      notification.error({
        message: "Login Failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-900 via-blue-800 to-blue-400">
      <Card style={{ width: "100%", maxWidth: 600 }}>
        <div className="flex justify-between items-center mb-4">
          <Title level={3} style={{ margin: 0 }}>
            Login
          </Title>
          <Space>
            <Button type="text" icon={<HomeOutlined />} onClick={onGoHome}>
              Home
            </Button>
            <GradientButton onClick={onSwitchToRegister}>
              <MoveHorizontal color="white" />
            </GradientButton>
          </Space>
        </div>
        <Text type="secondary">
          Welcome back! Please login to your account.
        </Text>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleLogin}
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

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-between items-center">
              <Link onClick={() => navigate("/request-password-reset")}>
                Forgot password?
              </Link>
            </div>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{ marginTop: 16 }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

interface RegisterPageProps {
  onSwitchToLogin: () => void;
  onGoHome: () => void;
}

interface FormData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  role: string;
  class: string;
  section: string;
  phoneNumber: string;
  hobbies: string[];
}

const RegisterPage: React.FC<RegisterPageProps> = ({
  onSwitchToLogin,
  onGoHome,
}) => {
  const [form] = Form.useForm();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    role: "student",
    class: "",
    section: "",
    phoneNumber: "",
    hobbies: [],
  });

  const Class = ["7", "8", "9", "10"];
  const Sections = ["Section A", "Section B", "Section C", "Section D"];
  const availableHobbies = [
    "Reading",
    "Sports",
    "Music",
    "Art",
    "Gaming",
    "Coding",
    "Photography",
    "Cooking",
  ];

  const handleSubmit = async (values: Partial<FormData>) => {
    if (step < 3) {
      setStep(step + 1);
      setFormData({ ...formData, ...values });
    } else {
      try {
        setLoading(true);
        const finalData = { ...formData, ...values };

        // Submit registration
        await authApi.register(finalData);

        // Show success notification
        notification.success({
          message: "Registration Successful",
          description:
            "Your account has been created successfully! You will be redirected to login shortly.",
          icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
          duration: 5,
        });

        // Redirect to login after 2 seconds
        setTimeout(() => {
          onSwitchToLogin();
        }, 2000);
      } catch (error: any) {
        notification.error({
          message: "Registration Failed",
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const renderStep1 = () => (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={formData}
    >
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            type: "string",
            message: "Please input your Name",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Full Name" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Please input a valid email!",
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 6, message: "Password must be at least 6 characters long!" },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match!"));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Confirm Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Next <RightOutlined />
        </Button>
      </Form.Item>
    </Form>
  );

  const renderStep2 = () => (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={formData}
    >
      <Form.Item name="role">
        <Input disabled defaultValue="student" />
      </Form.Item>

      <Form.Item
        name="class"
        rules={[{ required: true, message: "Please select your class!" }]}
      >
        <Select
          placeholder="Select your Class"
          style={{ width: "100%" }}
          defaultValue={undefined}
          allowClear
        >
          {Class.map((cls) => (
            <Select.Option key={cls} value={cls}>
              {cls}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="section"
        rules={[{ required: true, message: "Please select your Section!" }]}
      >
        <Select
          placeholder="Select your Section"
          allowClear
          defaultValue={undefined}
        >
          {Sections.map((sec) => (
            <Select.Option key={sec} value={sec}>
              {sec}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        rules={[
          { required: true, message: "Please input your phone number!" },
          {
            pattern: /^[0-9+\-\s]+$/,
            message: "Please enter a valid phone number!",
          },
        ]}
      >
        <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
      </Form.Item>

      <Form.Item>
        <div className="flex justify-between">
          <Button onClick={() => setStep(step - 1)}>
            <LeftOutlined /> Previous
          </Button>
          <Button type="primary" htmlType="submit">
            Next <RightOutlined />
          </Button>
        </div>
      </Form.Item>
    </Form>
  );

  const renderStep3 = () => (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={formData}
    >
      <Form.Item
        name="hobbies"
        rules={[
          {
            required: true,
            validator: (_, value) => {
              if (!value || value.length === 0) {
                return Promise.reject("Please select 3 hobbies");
              }
              if (value.length !== 3) {
                return Promise.reject("You must select exactly 3 hobbies");
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Select exactly 3 hobbies"
          style={{ width: "100%" }}
          maxTagCount={3}
          onSelect={(_, option: any) => {
            const currentValues = form.getFieldValue("hobbies") || [];
            if (currentValues.length >= 3) {
              form.setFieldValue("hobbies", [
                ...currentValues.slice(0, 2),
                option.value,
              ]);
            }
          }}
          showSearch={false}
        >
          {availableHobbies.map((hobby) => (
            <Select.Option
              key={hobby}
              value={hobby}
              disabled={
                form.getFieldValue("hobbies")?.length === 3 &&
                !form.getFieldValue("hobbies")?.includes(hobby)
              }
            >
              {hobby}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Alert
          message="Selection Requirement"
          description="Please select exactly 3 hobbies from the list above."
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <div className="flex justify-between">
          <Button onClick={() => setStep(step - 1)}>
            <LeftOutlined /> Previous
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Complete Registration
          </Button>
        </div>
      </Form.Item>
    </Form>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-900 via-blue-800 to-blue-400 p-4">
      <Card style={{ width: "100%", maxWidth: 600 }}>
        <div className="flex justify-between items-center mb-4">
          <Title level={3} style={{ margin: 0 }}>
            Register
          </Title>
          <Space>
            <Button type="text" icon={<HomeOutlined />} onClick={onGoHome}>
              Home
            </Button>
            <GradientButton onClick={onSwitchToLogin}>
              <MoveHorizontal color="white" />
            </GradientButton>
          </Space>
        </div>
        <Text type="secondary">Create your account in 3 easy steps</Text>

        <Steps current={step - 1} style={{ margin: "24px 0" }}>
          <Step title="Account" />
          <Step title="Details" />
          <Step title="Hobbies" />
        </Steps>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </Card>
    </div>
  );
};

const AuthPages: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div>
      {isLogin ? (
        <LoginPage
          onSwitchToRegister={() => setIsLogin(false)}
          onGoHome={handleGoHome}
        />
      ) : (
        <RegisterPage
          onSwitchToLogin={() => setIsLogin(true)}
          onGoHome={handleGoHome}
        />
      )}
    </div>
  );
};

export default AuthPages;
