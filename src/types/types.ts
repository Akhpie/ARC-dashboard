// types.ts
export interface ExamFile {
  name: string;
  type: string;
  size: number;
  status: string;
  url?: string;
}

export interface Exam {
  id: string;
  title: string;
  type: string;
  date: string;
  questionPaper: ExamFile;
  answerScript?: ExamFile;
}

export type ExamType = "mock" | "final" | "quiz";
