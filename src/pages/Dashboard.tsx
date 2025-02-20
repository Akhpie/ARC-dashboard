import React from "react";
import { BarChart, Users, Activity, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      change: "+12%",
      changeType: "increase",
    },
    {
      title: "Active Sessions",
      value: "567",
      icon: Activity,
      change: "+8%",
      changeType: "increase",
    },
    {
      title: "Revenue",
      value: "$12,345",
      icon: TrendingUp,
      change: "+23%",
      changeType: "increase",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      icon: BarChart,
      change: "+5%",
      changeType: "increase",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-lg p-3">
                <stat.icon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <span
                className={`text-sm font-medium ${
                  stat.changeType === "increase"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-500"> vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <p className="ml-4 text-sm text-gray-600">New user signed up</p>
                <span className="ml-auto text-sm text-gray-400">
                  2 hours ago
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              "Add User",
              "Generate Report",
              "Update Settings",
              "View Analytics",
            ].map((action) => (
              <button
                key={action}
                className="p-4 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
