import React from "react";
import { FileText, Download, TrendingUp, TrendingDown } from "lucide-react";

const ReportCards = () => {
  const semesters = [
    {
      term: "Spring 2024",
      gpa: 3.8,
      trend: "up",
      subjects: [
        { name: "Mathematics", grade: "A", score: 92 },
        { name: "Physics", grade: "A-", score: 89 },
        { name: "Chemistry", grade: "B+", score: 87 },
        { name: "Biology", grade: "A", score: 94 },
      ],
    },
    {
      term: "Fall 2023",
      gpa: 3.6,
      trend: "down",
      subjects: [
        { name: "Mathematics", grade: "B+", score: 88 },
        { name: "Physics", grade: "A", score: 93 },
        { name: "Chemistry", grade: "A-", score: 90 },
        { name: "Biology", grade: "B+", score: 87 },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FileText className="h-8 w-8 text-blue-500" />
            <div>
              <h1 className="text-2xl font-bold">Report Cards</h1>
              <p className="text-gray-400">View your academic progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Semester Reports */}
      {semesters.map((semester) => (
        <div
          key={semester.term}
          className="bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">{semester.term}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-gray-400">GPA: {semester.gpa}</span>
                {semester.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>
            <button className="p-2 hover:bg-gray-700 rounded-lg">
              <Download className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {semester.subjects.map((subject) => (
              <div key={subject.name} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{subject.name}</h3>
                  <div className="text-right">
                    <p className="text-xl font-bold">{subject.grade}</p>
                    <p className="text-sm text-gray-400">{subject.score}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportCards;
