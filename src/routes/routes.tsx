import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";
import DashboardLayout from "../components/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import GeneralSettings from "../pages/settings/GeneralSettings";
import SecuritySettings from "../pages/settings/SecuritySettings";
import UploadLecture from "../pages/exam-management/UploadLecture";
import UploadResources from "../pages/exam-management/UploadResources";
import CreateExam from "../pages/exam-management/CreateExam";
import ExamLog from "../pages/exam-management/ExamLog";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" replace />} />

      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<GeneralSettings />} />
        <Route path="settings/security" element={<SecuritySettings />} />

        <Route
          path="Exam-Management/upload-lecture"
          element={<UploadLecture />}
        />
        <Route path="Exam-Management/create-exam" element={<CreateExam />} />
        <Route path="Exam-Management/exam-log" element={<ExamLog />} />
        <Route
          path="Exam-Management/upload-resource"
          element={<UploadResources />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
