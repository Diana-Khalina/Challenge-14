import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    return jwtDecode<JwtPayload>(token); // Decodes the token to get user profile information
  }

  loggedIn() {
    const token = this.getToken();
    // Check if a token exists and if it's not expired
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return decoded.exp && decoded.exp < currentTime; // Check if token has expired
    } catch (error) {
      return true; // Treat any decoding errors as token expiration
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Retrieve the token from localStorage
  }

  login(idToken: string) {
    localStorage.setItem('token', idToken); // Store the token in localStorage
    window.location.assign('/'); // Redirect to the home page
  }

  logout() {
    localStorage.removeItem('token'); // Remove the token from localStorage
    window.location.assign('/auth/login'); // Redirect to the login page
  }
}

export default new AuthService();
