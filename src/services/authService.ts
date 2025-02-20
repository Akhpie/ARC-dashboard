export const logoutStudent = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const response = await fetch("http://localhost:5000/api/students/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
