import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const analyzeReports = async (
  markdown_text: string,
  product: string
) => {
  const response = await api.post("/proxy/analyze_markdown", {
    markdown_text,
    product,
  });
  return response.data;
};
