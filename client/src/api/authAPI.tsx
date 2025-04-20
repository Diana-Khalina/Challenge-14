import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error('Invalid username or password');
    }

    const data = await response.json();

    // Store JWT in local storage
    localStorage.setItem('token', data.token);

    return data; // Return the response data for further use
  } catch (error) {
    console.error('Login error:', error);
    throw error; // Throw the error to handle it in the calling component
  }
};

export { login };
