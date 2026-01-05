export const API_URL = "https://lifting-tracker-api.onrender.com";

// New Helper: Get the header with the password
export const getAuthHeader = () => {
  // Try to get password from browser storage
  let password = localStorage.getItem("admin_password");

  // If we don't have it, ask for it!
  if (!password) {
    password = prompt("Enter Admin Password to enable editing:");
    if (password) {
      localStorage.setItem("admin_password", password); // Save it for next time
    }
  }

  return { "x-admin-password": password };
};
