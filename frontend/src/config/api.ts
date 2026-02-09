// API Configuration for Rails Backend
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  // Auth endpoints
  signup: `${API_BASE_URL}/api/v1/signup`,
  login: `${API_BASE_URL}/api/v1/login`,
  logout: `${API_BASE_URL}/api/v1/logout`,
  currentUser: `${API_BASE_URL}/api/v1/current_user`,
  
  // Habit endpoints
  habits: `${API_BASE_URL}/api/v1/habits`,
  habitCompletions: `${API_BASE_URL}/api/v1/habit_completions`,
  dailyHighLows: `${API_BASE_URL}/api/v1/daily_high_lows`,
};

// Helper function for API calls with credentials
export const fetchWithCredentials = async (url: string, options: RequestInit = {}) => {
  const defaultOptions: RequestInit = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'An error occurred' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }
  
  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
};
