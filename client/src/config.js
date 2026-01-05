const isProduction = import.meta.env.MODE === "production";

export const API_URL = isProduction
  ? "https://lifting-tracker-api.onrender.com"
  : "https://127.0.0.1:5001";
