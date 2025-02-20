// import React, { useState } from "react";
// import { Book, FileText, Download, Clock, EyeIcon } from "lucide-react";

// const Resources = () => {
//   const [selectedSubject, setSelectedSubject] = useState("mathematics");

//   const subjects = [
//     { id: "mathematics", name: "Mathematics" },
//     { id: "physics", name: "Physics" },
//     { id: "chemistry", name: "Chemistry" },
//     { id: "biology", name: "Biology" },
//   ];

//   const resources = {
//     mathematics: [
//       { title: "Calculus Fundamentals", type: "PDF", size: "2.5 MB" },
//       { title: "Algebra Practice Problems", type: "PDF", size: "1.8 MB" },
//       { title: "Geometry Formulas", type: "PDF", size: "1.2 MB" },
//     ],
//     physics: [
//       { title: "Mechanics Study Guide", type: "PDF", size: "3.1 MB" },
//       { title: "Waves and Optics Notes", type: "PDF", size: "2.2 MB" },
//       { title: "Thermodynamics Overview", type: "PDF", size: "1.9 MB" },
//     ],
//     chemistry: [
//       { title: "Organic Chemistry Basics", type: "PDF", size: "2.8 MB" },
//       { title: "Periodic Table Guide", type: "PDF", size: "1.5 MB" },
//       { title: "Chemical Reactions", type: "PDF", size: "2.1 MB" },
//     ],
//     biology: [
//       { title: "Cell Biology Notes", type: "PDF", size: "2.4 MB" },
//       { title: "Genetics Overview", type: "PDF", size: "2.0 MB" },
//       { title: "Evolution Study Guide", type: "PDF", size: "1.7 MB" },
//     ],
//   };

//   const mockTests = {
//     mathematics: [
//       { title: "Mathematics Q paper 1", duration: "60 mins", questions: 30 },
//       { title: "Mathematics Q paper 2", duration: "45 mins", questions: 25 },
//       { title: "Mathematics Q paper 3", duration: "30 mins", questions: 20 },
//     ],
//     physics: [
//       { title: "Physics Q paper 1", duration: "90 mins", questions: 40 },
//       { title: "Physics Q paper 2", duration: "45 mins", questions: 25 },
//       { title: "Physics Q paper 3", duration: "60 mins", questions: 30 },
//     ],
//     chemistry: [
//       { title: "Chemistry Q paper 1", duration: "75 mins", questions: 35 },
//       { title: "Chemistry Q paper 2", duration: "40 mins", questions: 20 },
//       { title: "Chemistry Q paper 3", duration: "60 mins", questions: 30 },
//     ],
//     biology: [
//       { title: "Biology Q paper 1", duration: "80 mins", questions: 40 },
//       { title: "Biology Q paper 2", duration: "45 mins", questions: 25 },
//       { title: "Biology Q paper 3", duration: "60 mins", questions: 30 },
//     ],
//   };

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//       {/* Main Content - Learning Resources */}
//       <div className="lg:col-span-8">
//         <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
//           <div className="flex items-center space-x-4 mb-6">
//             <Book className="h-6 w-6 text-blue-500" />
//             <h2 className="text-xl font-bold">Learning Resources</h2>
//           </div>

//           {/* Subject Tabs */}
//           <div className="flex space-x-4 mb-6 overflow-x-auto">
//             {subjects.map((subject) => (
//               <button
//                 key={subject.id}
//                 onClick={() => setSelectedSubject(subject.id)}
//                 className={`px-4 py-2 rounded-lg whitespace-nowrap ${
//                   selectedSubject === subject.id
//                     ? "bg-blue-500 text-white"
//                     : "text-gray-400 hover:bg-gray-700"
//                 }`}
//               >
//                 {subject.name}
//               </button>
//             ))}
//           </div>

//           {/* Resources List */}
//           <div className="space-y-4">
//             {resources[selectedSubject]?.map((resource) => (
//               <div
//                 key={resource.title}
//                 className="flex items-center justify-between p-4 hover:bg-gray-700 rounded-lg transition-colors"
//               >
//                 <div className="flex items-center space-x-4">
//                   <FileText className="h-5 w-5 text-gray-400" />
//                   <div>
//                     <h3 className="font-semibold">{resource.title}</h3>
//                     <p className="text-sm text-gray-400">
//                       {resource.type} • {resource.size}
//                     </p>
//                   </div>
//                 </div>
//                 <button className="p-2 hover:bg-gray-600 rounded-lg">
//                   <Download className="h-5 w-5" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Right Sidebar - Mock Tests */}
//       <div className="lg:col-span-4">
//         <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
//           <div className="flex items-center space-x-4 mb-6">
//             <Clock className="h-6 w-6 text-purple-500" />
//             <h2 className="text-xl font-bold">Previous year question papers</h2>
//           </div>

//           <div className="space-y-4">
//             {mockTests[selectedSubject]?.map((ques) => (
//               <div
//                 key={ques.title}
//                 className="p-4 hover:bg-gray-700 rounded-lg transition-colors"
//               >
//                 <h3 className="font-semibold">{ques.title}</h3>
//                 <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
//                   <span>{ques.duration}</span>
//                   <span>•</span>
//                   <span>{ques.questions} questions</span>
//                 </div>
//                 <div className="mt-3 flex space-x-2">
//                   <button className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors flex items-center justify-center">
//                     <EyeIcon className="h-4 w-4 mr-2" />
//                     View
//                   </button>
//                   <button className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-center">
//                     <Download className="h-4 w-4 mr-2" />
//                     Download
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Resources;

import React, { useState, useEffect } from "react";
import { Book, FileText, Download, Clock, EyeIcon } from "lucide-react";
import axios from "axios";

// Types
interface IResource {
  _id: string;
  title: string;
  subject: "mathematics" | "physics" | "chemistry" | "biology";
  resourceType: "PDF" | "DOC";
  driveLink: string;
  createdAt: string;
  updatedAt: string;
}

const Resources = () => {
  const [selectedSubject, setSelectedSubject] = useState("mathematics");
  const [resources, setResources] = useState<IResource[]>([]);
  const [loading, setLoading] = useState(true);

  const subjects = [
    { id: "mathematics", name: "Mathematics" },
    { id: "physics", name: "Physics" },
    { id: "chemistry", name: "Chemistry" },
    { id: "biology", name: "Biology" },
  ];

  // Mock tests data remains the same as it's not part of the backend yet
  const mockTests = {
    mathematics: [
      { title: "Mathematics Q paper 1", duration: "60 mins", questions: 30 },
      { title: "Mathematics Q paper 2", duration: "45 mins", questions: 25 },
      { title: "Mathematics Q paper 3", duration: "30 mins", questions: 20 },
    ],
    physics: [
      { title: "Physics Q paper 1", duration: "90 mins", questions: 40 },
      { title: "Physics Q paper 2", duration: "45 mins", questions: 25 },
      { title: "Physics Q paper 3", duration: "60 mins", questions: 30 },
    ],
    chemistry: [
      { title: "Chemistry Q paper 1", duration: "75 mins", questions: 35 },
      { title: "Chemistry Q paper 2", duration: "40 mins", questions: 20 },
      { title: "Chemistry Q paper 3", duration: "60 mins", questions: 30 },
    ],
    biology: [
      { title: "Biology Q paper 1", duration: "80 mins", questions: 40 },
      { title: "Biology Q paper 2", duration: "45 mins", questions: 25 },
      { title: "Biology Q paper 3", duration: "60 mins", questions: 30 },
    ],
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await axios.get<IResource[]>(
        "http://localhost:5000/api/resources"
      );
      setResources(response.data);
    } catch (error) {
      console.error("Failed to fetch resources:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter resources based on selected subject
  const filteredResources = resources.filter(
    (resource) => resource.subject === selectedSubject
  );

  const handleResourceClick = (driveLink: string) => {
    window.open(driveLink, "_blank");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Main Content - Learning Resources */}
      <div className="lg:col-span-8">
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-4 mb-6">
            <Book className="h-6 w-6 text-blue-500" />
            <h2 className="text-xl font-bold">Learning Resources</h2>
          </div>

          {/* Subject Tabs */}
          <div className="flex space-x-4 mb-6 overflow-x-auto">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => setSelectedSubject(subject.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  selectedSubject === subject.id
                    ? "bg-blue-500 text-white"
                    : "text-gray-400 hover:bg-gray-700"
                }`}
              >
                {subject.name}
              </button>
            ))}
          </div>

          {/* Resources List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8 text-gray-400">
                Loading resources...
              </div>
            ) : filteredResources.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                No resources available for {selectedSubject}
              </div>
            ) : (
              filteredResources.map((resource) => (
                <div
                  key={resource._id}
                  className="flex items-center justify-between p-4 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <h3 className="font-semibold">{resource.title}</h3>
                      <p className="text-sm text-gray-400">
                        {resource.resourceType}
                      </p>
                    </div>
                  </div>
                  <button
                    className="p-2 hover:bg-gray-600 rounded-lg"
                    onClick={() => handleResourceClick(resource.driveLink)}
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Mock Tests */}
      <div className="lg:col-span-4">
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-4 mb-6">
            <Clock className="h-6 w-6 text-purple-500" />
            <h2 className="text-xl font-bold">Previous year question papers</h2>
          </div>

          <div className="space-y-4">
            {mockTests[selectedSubject]?.map((ques) => (
              <div
                key={ques.title}
                className="p-4 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <h3 className="font-semibold">{ques.title}</h3>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-400">
                  <span>{ques.duration}</span>
                  <span>•</span>
                  <span>{ques.questions} questions</span>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors flex items-center justify-center">
                    <EyeIcon className="h-4 w-4 mr-2" />
                    View
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
