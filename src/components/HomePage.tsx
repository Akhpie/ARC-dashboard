import React, { useState } from "react";
import { Layout, Button, Card, Typography, Statistic, Drawer } from "antd";
import { ChevronRight, Trophy, Bell, Zap, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import "../styles/HomePage.css";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const styles = `
  .grid-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: 50px 50px;
    background-image:
      linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    z-index: 0;
  }

  .content-container {
    position: relative;
    z-index: 1;
  }

    .ant-drawer-header {
    background: #0c075775 !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  }

  .glassmorphic {
    background: rgba(255, 255, 255, 0.15) !important;
    backdrop-filter: blur(10px) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    transition: all 0.3s ease !important;
  }

  .glassmorphic:hover {
    background: rgba(255, 255, 255, 0.2) !important;
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .pill-nav {
    background: rgba(255, 255, 255, 0.15) !important;
    backdrop-filter: blur(10px) !important;
    border-radius: 50px !important;
    padding: 8px 24px !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .nav-link {
    color: white !important;
    font-size: 16px !important;
    padding: 8px 16px !important;
    border-radius: 20px !important;
    transition: all 0.3s ease !important;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;
  }

    .mobile-nav-link {
    color: white !important;
    font-size: 18px !important;
    padding: 12px 16px !important;
    width: 100% !important;
    text-align: left !important;
    border-radius: 8px !important;
    margin-bottom: 8px !important;
  }

    .mobile-nav-link:hover {
    background: rgba(255, 255, 255, 0.2) !important;
  }

  .nav-link:hover {
    background: rgba(255, 255, 255, 0.1) !important;
  }

  .feature-card {
    background: rgba(255, 255, 255, 0.15) !important;
    backdrop-filter: blur(8px) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    transition: all 0.3s ease !important;
    height: 100% !important;
  }

  .feature-card:hover {
    transform: translateY(-5px) !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
  }

  .gradient-text {
    background: linear-gradient(45deg, #b794f4 30%, #4ade80 70%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    animation: gradient 8s ease infinite;
    font-weight: 800 !important;
  }

  .mobile-login-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}

    .mobile-login-button {
    width: 100% !important;
    text-align: center !important;
    padding: 12px !important;
    background: rgba(255, 255, 255, 0.15) !important;
    color: white !important;
    border-radius: 8px !important;
  }

  .start-button {
    background: linear-gradient(45deg, #b794f4, #4ade80) !important;
    border: none !important;
    padding: 24px 48px !important;
    height: auto !important;
    font-size: 18px !important;
    transition: all 0.3s ease !important;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;
  }

  .start-button:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
    opacity: 0.9 !important;
  }

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .stats-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 48px;
    text-align: center;
  }

  .stat-item {
    padding: 24px;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-top: 30px;
    padding: 0 48px;
  }

  .feature-title {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
  }

  .feature-description {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
  }

  .mobile-menu {
    display: none;
    color: white !important;
    background: rgba(255, 255, 255, 0.15) !important;
  }
      .mobile-menu svg {
    width: 24px;
    height: 24px;
    color: white;
  }

  .desktop-nav {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .login-buttons {
    display: flex;
    gap: 12px;
  }

  @media (max-width: 1024px) {
    .features-grid {
      grid-template-columns: repeat(2, 1fr);
      padding: 0 24px;
    }

    .stats-container {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }
  }

  @media (max-width: 768px) {
    .desktop-nav {
      display: none;
    }

    .mobile-menu {
      display: flex !important;
      align-items: center;
      justify-content: center;
    }

    .features-grid {
      grid-template-columns: 1fr;
    }

    .stats-container {
      grid-template-columns: 1fr;
    }

    .pill-nav {
      padding: 8px 16px !important;
    }
  }
`;

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleTeacherClick = () => {
    navigate("/admin");
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <Button type="link" className={mobile ? "mobile-nav-link" : "nav-link"}>
        Features
      </Button>
      <Button type="link" className={mobile ? "mobile-nav-link" : "nav-link"}>
        News
      </Button>
      <Button type="link" className={mobile ? "mobile-nav-link" : "nav-link"}>
        Resources
      </Button>
    </>
  );

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
          "linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #059669 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{styles}</style>

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
              >
                ARC
              </Title>
              <div className="desktop-nav">
                <NavLinks />
              </div>
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
              background: "rgba(76, 29, 149, 0.95)",
            },
          }}
        >
          <div className="flex flex-col gap-4">
            <NavLinks mobile={true} />
            <LoginButtons mobile={true} />
          </div>
        </Drawer>

        <Content>
          <div
            style={{
              padding: "180px 48px 100px",
              textAlign: "center",
              maxWidth: 1200,
              margin: "0 auto",
            }}
          >
            <Title className="gradient-text text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-8">
              Transform Your Learning Journey
            </Title>

            <Paragraph
              style={{
                fontSize: 20,
                color: "rgba(255, 255, 255, 0.95)",
                marginBottom: 48,
                maxWidth: 800,
                margin: "0 auto 48px",
                textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
              }}
            >
              Empower your educational experience with cutting-edge tools and
              rewards
            </Paragraph>
            <Button
              type="primary"
              className="start-button"
              icon={<ChevronRight />}
            >
              Start Learning
            </Button>
          </div>

          <div className="features-grid">
            {[
              {
                icon: <Trophy size={48} color="#b794f4" />,
                title: "Reward System",
                description: "Earn points and unlock achievements as you learn",
              },
              {
                icon: <Bell size={48} color="#4ade80" />,
                title: "Latest News",
                description: "Stay updated with educational trends",
              },
              {
                icon: <Zap size={48} color="#b794f4" />,
                title: "Focus Mode",
                description: "Enhance your concentration",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="feature-card"
                bordered={false}
                style={{ background: "transparent" }}
              >
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  {feature.icon}
                </div>
                <Title
                  level={3}
                  className="feature-title"
                  style={{
                    color: "white",
                    textAlign: "center",
                    marginBottom: 16,
                  }}
                >
                  {feature.title}
                </Title>
                <Paragraph
                  className="feature-description"
                  style={{
                    color: "rgba(255, 255, 255, 0.95)",
                    textAlign: "center",
                  }}
                >
                  {feature.description}
                </Paragraph>
              </Card>
            ))}
          </div>

          <div
            className="glassmorphic"
            style={{
              margin: "100px 48px",
              borderRadius: 20,
              padding: "48px",
            }}
          >
            <div className="stats-container">
              {[
                {
                  title: "Active Students",
                  value: 10000,
                  suffix: "+",
                  color: "#4ade80",
                },
                {
                  title: "Courses",
                  value: 500,
                  suffix: "+",
                  color: "#b794f4",
                },
                {
                  title: "Success Rate",
                  value: 95,
                  suffix: "%",
                  color: "#4ade80",
                },
              ].map((stat, index) => (
                <div key={index} className="stat-item">
                  <Statistic
                    title={
                      <span
                        style={{
                          color: "white",
                          fontSize: "18px",
                          textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
                        }}
                      >
                        {stat.title}
                      </span>
                    }
                    value={stat.value}
                    suffix={stat.suffix}
                    valueStyle={{
                      color: stat.color,
                      fontSize: "36px",
                      fontWeight: "bold",
                      textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Content>
      </div>
    </Layout>
  );
};

export default HomePage;
