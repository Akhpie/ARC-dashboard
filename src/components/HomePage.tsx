import React, { useState } from "react";
import { Layout, Button, Card, Typography, Statistic, Drawer } from "antd";
import { ChevronRight, Trophy, Bell, Zap, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ScrollAnimationDemo from "./ScrollAnimation";
import AnimatedText from "./AnimatedText";
import "../styles/HomePage.css";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleTeacherClick = () => {
    navigate("/admin");
  };

  const LoginButtons = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={mobile ? "mobile-login-buttons" : "login-buttons"}>
      <Button
        type="primary"
        className={mobile ? "mobile-login-button" : "glassmorphic"}
        style={
          !mobile
            ? {
                padding: "8px 16px",
                height: "auto",
                color: "white",
                textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
              }
            : {}
        }
        onClick={handleTeacherClick}
      >
        Teacher Login
      </Button>
      <Button
        type="primary"
        className={mobile ? "mobile-login-button" : "glassmorphic"}
        style={
          !mobile
            ? {
                padding: "8px 16px",
                height: "auto",
                color: "white",
                textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
              }
            : {}
        }
      >
        Student Login
      </Button>
    </div>
  );

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #60a5fa 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="grid-background" />

      <div className="content-container">
        <Header
          style={{
            position: "fixed",
            width: "100%",
            zIndex: 1000,
            background: "transparent",
            padding: "20px",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="pill-nav">
              <Title
                level={4}
                style={{
                  margin: 0,
                  color: "white",
                  textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
                }}
                onClick={() => navigate("/")}
              >
                ARC
              </Title>
              <div className="desktop-nav"></div>
            </div>

            <div className="desktop-nav">
              <LoginButtons />
            </div>

            <Button
              className="mobile-menu glassmorphic"
              style={{
                padding: "8px",
                height: "auto",
                color: "white",
              }}
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu />
            </Button>
          </div>
        </Header>

        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
          styles={{
            header: {
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            },
            body: {
              padding: "24px",
              background:
                "linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #60a5fa 100%)",
            },
          }}
        >
          <div className="flex flex-col gap-4">
            <LoginButtons mobile={true} />
          </div>
        </Drawer>

        <Content>
          <div
            style={{
              padding: "180px 48px 40px",
              textAlign: "center",
              maxWidth: 1200,
              margin: "0 auto",
            }}
          >
            <Title className="gradient-text text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-8 .font-Josefin">
              Transform Your Learning Journey
            </Title>

            <Paragraph
              style={{
                fontSize: 20,
                color: "rgba(255, 255, 255, 0.95)",
                marginBottom: 48,
                maxWidth: 800,
                margin: "0 auto 0px",
                textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
              }}
              className="font-inter"
            >
              Empower your educational experience with cutting-edge tools
            </Paragraph>
            <AnimatedText />
          </div>

          <ScrollAnimationDemo />
        </Content>
      </div>
    </Layout>
  );
};

export default HomePage;
