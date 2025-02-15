import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Button, Switch } from "antd";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Menu as MenuIcon,
  Sun,
  Moon,
  LineChart,
  UserPlus,
  UsersRound,
  Cog,
  Bell,
  Shield,
  BookMarked,
  Youtube,
  UploadCloudIcon,
  ListChecksIcon,
  CheckCircle,
  View,
  BookCopyIcon,
  BookCheckIcon,
  Sidebar,
} from "lucide-react";

const { Header, Sider, Content } = Layout;

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const toggleTheme = (checked: boolean) => {
    setIsDarkMode(checked);
    document.documentElement.classList.toggle("dark", checked);
  };

  const menuItems = [
    {
      key: "dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
      children: [
        {
          key: "/dashboard",
          icon: <LineChart className="w-4 h-4" />,
          label: "Analytics",
        },
        {
          key: "/dashboard/activity",
          icon: <Bell className="w-4 h-4" />,
          label: "Activity",
        },
      ],
    },
    {
      key: "ExamManagement",
      icon: <BookMarked className="w-5 h-5" />,
      label: "Exam Management",
      children: [
        {
          key: "/dashboard/Exam-Management/create-exam",
          icon: <UploadCloudIcon className="w-4 h-4" />,
          label: "Create Exam",
        },
        {
          key: "/dashboard/Exam-Management/upload-lecture",
          icon: <Youtube className="w-4 h-4" />,
          label: "Upload Lecture Vid",
        },
        {
          key: "/dashboard/Exam-Management/upload-resource",
          icon: <BookCheckIcon className="w-4 h-4" />,
          label: "Upload Resources",
        },
        {
          key: "/dashboard/Exam-Management/exam-log",
          icon: <ListChecksIcon className="w-4 h-4" />,
          label: "Exam Log",
        },
        {
          key: "/dashboard/Exam-Management/view-marks",
          icon: <CheckCircle className="w-4 h-4" />,
          label: "View Marks",
        },
        {
          key: "/dashboard/Exam-Management/view-exam-report",
          icon: <View className="w-4 h-4" />,
          label: "View Exam Reports",
        },
        {
          key: "/dashboard/Exam-Management/view-homeworks",
          icon: <BookCopyIcon className="w-4 h-4" />,
          label: "View Homeworks",
        },
      ],
    },
    {
      key: "users",
      icon: <Users className="w-5 h-5" />,
      label: "Users",
      children: [
        {
          key: "/dashboard/users",
          icon: <UsersRound className="w-4 h-4" />,
          label: "All Users",
        },
        {
          key: "/dashboard/users/new",
          icon: <UserPlus className="w-4 h-4" />,
          label: "Add User",
        },
      ],
    },
    {
      key: "settings",
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      children: [
        {
          key: "/dashboard/settings",
          icon: <Cog className="w-4 h-4" />,
          label: "General",
        },
        {
          key: "/dashboard/settings/security",
          icon: <Shield className="w-4 h-4" />,
          label: "Security",
        },
      ],
    },
  ];

  return (
    <Layout className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="shadow-sm dark:bg-gray-800 bg-white ml-2 mr-2 rounded-lg mt-2 mb-2"
        breakpoint="lg"
        onBreakpoint={setCollapsed}
      >
        <div className="h-16 flex items-center px-4 border-b dark:border-gray-700">
          <h1
            className={`text-xl font-semibold text-purple-600 transition-all duration-200 ${
              collapsed ? "opacity-1 w-0" : "opacity-100 w-auto"
            }`}
          >
            ARC
          </h1>
        </div>
        <Menu
          theme={isDarkMode ? "dark" : "light"}
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={["dashboard"]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          className="border-none"
          style={{
            backgroundColor: "transparent",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t dark:border-gray-700">
          <Button
            type="text"
            icon={<LogOut className="w-5 h-5" />}
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-slate-300 dark:bg-slate-600"
          >
            {!collapsed && "Sign Out"}
          </Button>
        </div>
      </Sider>
      <Layout>
        <Header className="flex items-center justify-between px-6 bg-white dark:bg-gray-800 border-b dark:border-gray-700 rounded-lg mt-2 mr-2">
          <Button
            type="text"
            icon={<Sidebar className="w-5 h-5" />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <div className="flex items-center gap-3">
            <Sun className="w-4 h-4 dark:text-gray-400" />
            <Switch
              checked={isDarkMode}
              onChange={toggleTheme}
              className={`${isDarkMode ? "bg-purple-600" : "bg-gray-200"}`}
            />
            <Moon className="w-4 h-4 dark:text-gray-400" />
          </div>
        </Header>
        <Content className="p-6 dark:bg-gray-900">
          <div className="min-h-[280px] p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
