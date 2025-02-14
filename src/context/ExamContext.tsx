// ExamContext.tsx
import React, { createContext, useContext, useState } from "react";
import { Exam } from "../types/types";

interface ExamContextType {
  exams: Exam[];
  addExam: (exam: Exam) => void;
  deleteExam: (id: string) => void;
  updateExam: (exam: Exam) => void;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const ExamProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [exams, setExams] = useState<Exam[]>([]);

  const addExam = (exam: Exam) => {
    setExams((prev) => [...prev, exam]);
  };

  const deleteExam = (id: string) => {
    setExams((prev) => prev.filter((exam) => exam.id !== id));
  };

  const updateExam = (updatedExam: Exam) => {
    setExams((prev) =>
      prev.map((exam) => (exam.id === updatedExam.id ? updatedExam : exam))
    );
  };

  return (
    <ExamContext.Provider value={{ exams, addExam, deleteExam, updateExam }}>
      {children}
    </ExamContext.Provider>
  );
};

export const useExams = () => {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error("useExams must be used within an ExamProvider");
  }
  return context;
};
