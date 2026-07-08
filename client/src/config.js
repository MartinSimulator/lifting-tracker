const isProduction = import.meta.env.MODE === "production";

export const API_URL = isProduction
  ? "https://lift-tracker-api-152178411789.us-central1.run.app"
  : "http://localhost:8080";

export const getAuthHeader = () => {
  // ask the user for the password
  const password = prompt("Please enter the Admin Password to confirm:");

  // return it in the header
  return { "x-admin-password": password };
};
