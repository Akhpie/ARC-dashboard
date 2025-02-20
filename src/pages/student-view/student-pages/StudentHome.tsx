import React, { useState } from "react";
import {
  Search,
  Calendar,
  Book,
  GraduationCap,
  Trophy,
  Plus,
} from "lucide-react";

const StudentHome = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { icon: Book, label: "Courses", value: "6" },
    { icon: GraduationCap, label: "Average Grade", value: "A-" },
    { icon: Calendar, label: "Attendance", value: "95%" },
    { icon: Trophy, label: "Achievements", value: "12" },
  ];

  const news = [
    { title: "New Learning Resources Added", date: "March 15, 2024" },
    { title: "Upcoming Spring Break", date: "March 20, 2024" },
    { title: "Science Fair Registration Open", date: "March 25, 2024" },
  ];

  const events = [
    { title: "Math Club Meeting", date: "Today, 3:00 PM" },
    { title: "Biology Lab Session", date: "Tomorrow, 2:00 PM" },
    { title: "Career Counseling", date: "March 18, 4:00 PM" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{label}</p>
                  <p className="text-2xl font-bold mt-1">{value}</p>
                </div>
                <Icon className="h-8 w-8 text-blue-500" />
              </div>
            </div>
          ))}
        </div>

        {/* News Section */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Latest News</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="space-y-4">
            {news.map((item) => (
              <div
                key={item.title}
                className="p-4 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="lg:col-span-4 space-y-8">
        {/* Upcoming Events */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Upcoming Events</h2>
            <button className="p-2 hover:bg-gray-700 rounded-lg">
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.title}
                className="p-4 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{event.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
