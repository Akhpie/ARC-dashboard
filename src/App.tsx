import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/routes";
import { ConfigProvider, theme } from "antd";
import { ExamProvider } from "./context/ExamContext";

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  return (
    <>
      <ExamProvider>
        <ConfigProvider
          theme={{
            algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
            token: {
              // Custom tokens
              colorPrimary: "#9333ea", // purple-600
              borderRadius: 8,
              // Add more token overrides
            },
          }}
        >
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
          <Toaster position="top-right" />
        </ConfigProvider>
      </ExamProvider>
    </>
  );
};

export default App;
