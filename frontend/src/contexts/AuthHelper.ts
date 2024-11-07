import axios from "axios";

let storedRefreshToken: string | null = localStorage.getItem('refreshToken');

export const refreshAccessToken = async (): Promise<string | null> => {
  if (!storedRefreshToken) {
    logout();
    return null;
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/refresh-token`, {
      refreshToken: storedRefreshToken,
    });
    const { accessToken: newAccessToken } = response.data;
    localStorage.setItem('accessToken', newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    logout();
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  storedRefreshToken = null;
};
