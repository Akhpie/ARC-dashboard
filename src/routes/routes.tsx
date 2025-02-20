// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import AuthLayout from "../components/AuthLayout";
// import SignIn from "../pages/SignIn";
// import Register from "../pages/Register";
// import DashboardLayout from "../components/DashboardLayout";
// import Dashboard from "../pages/Dashboard";
// import GeneralSettings from "../pages/settings/GeneralSettings";
// import SecuritySettings from "../pages/settings/SecuritySettings";
// import UploadLecture from "../pages/exam-management/UploadLecture";
// import UploadResources from "../pages/exam-management/UploadResources";
// import CreateExam from "../pages/exam-management/CreateExam";
// import ExamLog from "../pages/exam-management/ExamLog";
// import HomePage from "../components/HomePage";
// import StudentLogin from "../pages/student-view/StudentLogin";
// import StudentLayout from "../pages/student-view/student-dashboard/StudentLayout";
// import {
//   RequestPasswordResetPage,
//   ResetPasswordPage,
//   VerifyEmailPage,
// } from "../components/PasswordReset";

// const isAuthenticated = () => {
//   return localStorage.getItem("token") !== null;
// };

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   if (!isAuthenticated()) {
//     return <Navigate to="/student-login" replace />;
//   }
//   return <>{children}</>;
// };

// const AppRoutes: React.FC = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/student-login" element={<StudentLogin />} />
//       <Route path="/reset-password" element={<ResetPasswordPage />} />
//       <Route path="/verify-email" element={<VerifyEmailPage />} />
//       <Route
//         path="/request-password-reset"
//         element={<RequestPasswordResetPage />}
//       />

//       {/* Protected routes */}
// <Route
//   path="/student-dashboard"
//   element={
//     <ProtectedRoute>
//       <StudentLayout />
//     </ProtectedRoute>
//   }
// />

//       <Route path="/admin" element={<Navigate to="/signin" replace />} />

//       <Route element={<AuthLayout />}>
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/register" element={<Register />} />
//       </Route>

//       <Route path="/dashboard" element={<DashboardLayout />}>
//         <Route index element={<Dashboard />} />
//         <Route path="settings" element={<GeneralSettings />} />
//         <Route path="settings/security" element={<SecuritySettings />} />

//         <Route
//           path="Exam-Management/upload-lecture"
//           element={<UploadLecture />}
//         />
//         <Route path="Exam-Management/create-exam" element={<CreateExam />} />
//         <Route path="Exam-Management/exam-log" element={<ExamLog />} />
//         <Route
//           path="Exam-Management/upload-resource"
//           element={<UploadResources />}
//         />
//       </Route>
//     </Routes>
//   );
// };

// export default AppRoutes;

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
import HomePage from "../components/HomePage";
import StudentLogin from "../pages/student-view/StudentLogin";
import StudentLayout from "../pages/student-view/student-dashboard/StudentLayout";

import {
  RequestPasswordResetPage,
  ResetPasswordPage,
  VerifyEmailPage,
} from "../components/PasswordReset";
import StudentHome from "../pages/student-view/student-pages/StudentHome";
import Resources from "../pages/student-view/student-pages/Resources";
import ReportCards from "../pages/student-view/student-pages/ReportCards";
import Settings from "../pages/student-view/student-pages/Settings";
import StudentExamLog from "../pages/student-view/student-pages/StudentExamLog";
import StudentRewards from "../pages/student-view/student-pages/StudentRewards";

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/student-login" replace />;
  }
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route
        path="/request-password-reset"
        element={<RequestPasswordResetPage />}
      />

      {/* Student routes with nested structure */}
      <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentHome />} />
        <Route path="resources" element={<Resources />} />
        <Route path="student-exam-log" element={<StudentExamLog />} />
        <Route path="report-cards" element={<ReportCards />} />
        <Route path="student-settings" element={<Settings />} />
        <Route path="student-rewards" element={<StudentRewards />} />
      </Route>

      <Route path="/admin" element={<Navigate to="/signin" replace />} />

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
