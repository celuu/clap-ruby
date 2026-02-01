import { Profile } from "@/types";
import { API_ENDPOINTS, fetchWithCredentials } from "../config/api";

/**
 * Get user profile information
 */
export async function getProfile(): Promise<Profile | null> {
  try {
    const data = await fetchWithCredentials(API_ENDPOINTS.profile);
    return data.profile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

/**
 * Update user profile
 */
export async function updateProfile(profileData: Partial<Profile>): Promise<Profile> {
  const data = await fetchWithCredentials(API_ENDPOINTS.profile, {
    method: 'PUT',
    body: JSON.stringify({
      profile: profileData,
    }),
  });
  
  return data.profile;
}

