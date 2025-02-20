import React from "react";
import { Calendar, TrendingUp } from "lucide-react";

const StudentExamLog = () => {
  const examHistory = [
    {
      subject: "Mathematics",
      date: "March 10, 2024",
      score: 92,
      grade: "A",
      type: "Mid-term",
    },
    {
      subject: "Physics",
      date: "March 8, 2024",
      score: 88,
      grade: "B+",
      type: "Quiz",
    },
    {
      subject: "Chemistry",
      date: "March 5, 2024",
      score: 95,
      grade: "A+",
      type: "Assignment",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Calendar className="h-8 w-8 text-blue-500" />
            <div>
              <h1 className="text-2xl font-bold">Exam Log</h1>
              <p className="text-gray-400">Track your academic performance</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span className="text-green-500">Average: 91.67%</span>
          </div>
        </div>
      </div>

      {/* Exam History */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-6">Recent Exams</h2>
        <div className="space-y-4">
          {examHistory.map((exam) => (
            <div
              key={`${exam.subject}-${exam.date}`}
              className="p-4 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{exam.subject}</h3>
                  <p className="text-sm text-gray-400">
                    {exam.type} • {exam.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">{exam.grade}</p>
                  <p className="text-sm text-gray-400">{exam.score}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentExamLog;
