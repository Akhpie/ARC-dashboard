import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";

const StudentLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <StudentNavbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
