
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

async function signUpUser(SignUpParams: SignUpUser): Promise<ApiResponse> {
  try {
    const response = await fetch(`${apiBaseUrl}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(SignUpParams),
    });

    const data: ApiResponse = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Sign-up failed");
    }
    return data;
  } catch (error) {
    console.error('Error in signUpUser: ', error);
    throw error;
  }
}

async function signInUser(SignInParams: LoginUser): Promise<ApiResponse> {
  try {
    const response = await fetch(`${apiBaseUrl}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(SignInParams),
    });

    const data: ApiResponse = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Sign-in failed");
    }
    return data;
  } catch (error) {
    console.error('Error in signInUser: ', error);
    throw error;
  }
}

async function signOutUser(): Promise<ApiResponse> {
  try {
    const response = await fetch(`${apiBaseUrl}/auth/sign-out`, {
      method: "POST",
      credentials: 'include',
    });

    const data: ApiResponse = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Sign-out failed");
    }
    return data;
  } catch (error) {
    console.error('Error in signOutUser: ', error);
    throw error;
  }
}

export { signUpUser, signInUser, signOutUser };