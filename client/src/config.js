const isProduction = import.meta.env.MODE === "production";

export const API_URL = isProduction
  ? "https://lifting-tracker-api.onrender.com"
  : "https://127.0.0.1:5001";

export const getAuthHeader = () => {
  // ask the user for the password
  const password = prompt("Please enter the Admin Password to confirm:");

  // return it in the header
  return { "x-admin-password": password };
};
