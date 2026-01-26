import { API_ENDPOINTS, fetchWithCredentials } from '../config/api';

export async function signUpNewUser(email: string, password: string, name: string) {
  const data = await fetchWithCredentials(API_ENDPOINTS.signup, {
    method: 'POST',
    body: JSON.stringify({
      user: {
        email,
        password,
        password_confirmation: password,
        name,
      },
    }),
  });
  
  return data;
}

export async function loginUser(email: string, password: string) {
  const data = await fetchWithCredentials(API_ENDPOINTS.login, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });
  
  return data;
}

export async function getCurrentUser() {
  try {
    const data = await fetchWithCredentials(API_ENDPOINTS.currentUser);
    return data.user;
  } catch (error) {
    return null;
  }
}

export async function logoutUser() {
  await fetchWithCredentials(API_ENDPOINTS.logout, {
    method: 'DELETE',
  });
}
