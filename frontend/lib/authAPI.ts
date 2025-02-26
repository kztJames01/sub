
  
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  
  async function signUpUser(SignUpParams: SignUpUser): Promise<ApiResponse> {
    const response = await fetch(`${apiBaseUrl}/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(SignUpParams),
    });
  
    const data: ApiResponse = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Sign-up failed");
    }
    return data;
  }
  
  async function signInUser(SignInParams: LoginUser): Promise<ApiResponse> {
    const response = await fetch(`${apiBaseUrl}/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(SignInParams),
    });
  
    const data: ApiResponse = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Sign-in failed");
    }
    return data;
  }
  
  export { signUpUser, signInUser };