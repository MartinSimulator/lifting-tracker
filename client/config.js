export const API_URL = "https://lifting-tracker-api.onrender.com";

export const getAuthHeader = () => {
  // ask the user for the password
  const password = prompt("Please enter the Admin Password to confirm:");

  // return it in the header
  return { "x-admin-password": password };
};
