import React, { useState, useEffect } from "react";
import { User, Shield, Camera, AlertCircle } from "lucide-react";
import clsx from "clsx";
import axios from "axios";
import { Tag } from "antd";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userData, setUserData] = useState({
    _id: "",
    name: "",
    email: "",
    class: "",
    section: "",
    phoneNumber: "",
    hobbies: [],
    joinDate: "",
    avatar: "/api/placeholder/400/400",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication required");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/students/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData({
          ...response.data,
          joinDate: new Date(response.data.createdAt).toLocaleDateString(
            "en-US",
            {
              month: "long",
              year: "numeric",
            }
          ),
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile data");
      }
    };

    fetchProfile();
  }, []);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
  ];

  const validatePasswordForm = () => {
    setError("");
    setSuccess("");

    if (!currentPassword) {
      setError("Current password is required");
      return false;
    }
    if (!newPassword) {
      setError("New password is required");
      return false;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return false;
    }
    return true;
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!validatePasswordForm()) {
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to update your password");
        setLoading(false);
        return;
      }

      const response = await axios.put(
        "http://localhost:5000/api/students/change-password",
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message) {
        setSuccess(response.data.message);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
        <div className="flex space-x-4">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setError("");
                setSuccess("");
              }}
              className={clsx(
                "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
                activeTab === id
                  ? "bg-blue-500 text-white"
                  : "text-gray-400 hover:bg-gray-700"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        {activeTab === "profile" ? (
          <div className="space-y-4">
            <div className="flex items-start space-x-6">
              {/* <div className="relative">
                <img
                  src={userData.avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div> */}
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-white">
                  {userData.name}
                </h2>
                <p className="text-blue-600">{userData.email}</p>
              </div>
            </div>
            <span className="inline-flex items-center rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 px-2 py-1 text-sm font-medium text-white shadow-xl">
              Student
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Student ID
                </label>
                <input
                  type="text"
                  value={userData._id}
                  readOnly
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Section
                </label>
                <input
                  type="text"
                  value={userData.section}
                  readOnly
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Class
                </label>
                <input
                  type="text"
                  value={userData.class}
                  readOnly
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={userData.phoneNumber}
                  readOnly
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Join Date
                </label>
                <input
                  type="text"
                  value={userData.joinDate}
                  readOnly
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Hobbies
                </label>
                <div className="flex flex-wrap gap-2">
                  {userData.hobbies.map((hobby, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-md text-sm shadow-xl"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Change Password</h2>

            {error && (
              <div className="flex items-center space-x-2 bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="flex items-center space-x-2 bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p>{success}</p>
              </div>
            )}

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 6 characters long
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={clsx(
                  "w-full px-4 py-2 rounded-lg transition-colors text-white",
                  loading
                    ? "bg-blue-700 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                )}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
