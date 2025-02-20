// types/resource.ts
export interface IResource {
  _id: string;
  title: string;
  subject: "mathematics" | "physics" | "chemistry" | "biology";
  resourceType: "PDF" | "DOC";
  driveLink: string;
  createdAt: string;
  updatedAt: string;
}
