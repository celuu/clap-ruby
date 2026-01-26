import { Profile } from "@/types";
import { API_ENDPOINTS, fetchWithCredentials } from "../config/api";
import { UserFormData } from "@/pages/Login/UserModal";

export async function getProfile(): Promise<Profile | null> {
  try {
    const data = await fetchWithCredentials(API_ENDPOINTS.profile);
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

export async function createProfile(profile: UserFormData) {
  // In the new system, profile is created with user registration
  // This function can be used to update the profile after creation
  return updateProfile(profile);
}

export async function updateProfile(profile: { name: string; email: string }) {
  const data = await fetchWithCredentials(API_ENDPOINTS.profile, {
    method: 'PUT',
    body: JSON.stringify({
      profile,
    }),
  });
  
  return data;
}
