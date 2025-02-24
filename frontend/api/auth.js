"use server";
// API functions to interact with the backend
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL; // Replace with your backend URL

async function signUpUser(userData) {
  const response = await fetch(`${apiBaseUrl}/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Sign-up failed");
  }
  return data;
}

async function signInUser(credentials) {
  const response = await fetch(`${apiBaseUrl}/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Sign-in failed");
  }
  return data;
}

export { signUpUser, signInUser };