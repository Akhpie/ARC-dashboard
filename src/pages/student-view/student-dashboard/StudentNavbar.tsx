import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  BookOpen,
  FileText,
  Award,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  BookOpenCheck,
} from "lucide-react";
import clsx from "clsx";
// Import your logout service
import { logoutStudent } from "../../../services/authService";

interface NavItem {
  path: string;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const StudentNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Add logout handler
  const handleLogout = async (): Promise<void> => {
    try {
      await logoutStudent();
      // Clear all authentication-related data from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Redirect to login page
      navigate("/student-login");
    } catch (error) {
      console.error("Error during logout:", error);
      // Even if the server request fails, clear local storage and redirect
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/student-login");
    }
  };

  const navItems: NavItem[] = [
    { path: "/student-dashboard", label: "Home", icon: Home },
    {
      path: "/student-dashboard/resources",
      label: "Resources",
      icon: BookOpenCheck,
    },
    {
      path: "/student-dashboard/student-exam-log",
      label: "Exam Log",
      icon: FileText,
    },
    {
      path: "/student-dashboard/report-cards",
      label: "Report Cards",
      icon: BookOpen,
    },
  ];

  return (
    <nav className="bg-gray-900 sticky top-0 z-50 mb-8 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold text-white">ARC</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={clsx(
                  "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors",
                  location.pathname === path
                    ? "bg-blue-500/10 text-blue-500"
                    : "text-gray-300 hover:text-blue-500 hover:bg-blue-500/5"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}

            <Link
              to="/student-dashboard/student-rewards"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-500/5 hover:text-blue-500"
            >
              <Award className="h-5 w-5 text-yellow-500" />
              <span>Rewards</span>
            </Link>

            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-500/5"
              >
                <User className="h-5 w-5" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg py-2 shadow-xl">
                  <Link
                    to="/student-dashboard/student-settings"
                    className="flex items-center px-4 py-2 hover:bg-gray-700 duration-300 transition-all ease-in-out"
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700 duration-300 transition-all ease-in-out text-red-400 hover:text-red-300"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-lg p-2 hover:bg-gray-800"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className="flex items-center space-x-2 px-4 py-3 hover:bg-gray-800 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
            <Link
              to="/student-rewards"
              className="flex items-center space-x-2 px-4 py-3 hover:bg-gray-800 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <Award className="h-5 w-5 text-yellow-500" />
              <span>Rewards</span>
            </Link>

            {/* Add logout to mobile menu */}
            <button
              className="flex items-center space-x-2 px-4 py-3 w-full text-left hover:bg-gray-800 rounded-lg text-red-400"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default StudentNavbar;
