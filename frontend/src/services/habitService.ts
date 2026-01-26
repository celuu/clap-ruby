// TODO: Implement habit service with Rails backend
// This is a placeholder - you'll need to create the Rails models and controllers first

import { API_BASE_URL, fetchWithCredentials } from '../config/api';

// Habit
export const getHabits = async () => {
  // TODO: Implement after creating Rails Habit model and controller
  // const data = await fetchWithCredentials(`${API_BASE_URL}/api/v1/habits`);
  // return data;
  console.warn('getHabits: Not yet implemented - create Rails Habit model first');
  return [];
};

export const createHabit = async (habit: { label: string; weekly_target: number }) => {
  // TODO: Implement after creating Rails Habit model and controller
  // const data = await fetchWithCredentials(`${API_BASE_URL}/api/v1/habits`, {
  //   method: 'POST',
  //   body: JSON.stringify({ habit }),
  // });
  // return data;
  console.warn('createHabit: Not yet implemented - create Rails Habit model first');
  return null;
};

export const deleteHabit = async (id: string) => {
  // TODO: Implement after creating Rails Habit model and controller
  // await fetchWithCredentials(`${API_BASE_URL}/api/v1/habits/${id}`, {
  //   method: 'DELETE',
  // });
  console.warn('deleteHabit: Not yet implemented - create Rails Habit model first');
  return 204;
};

// Habit Completion
export const createHabitCompletion = async (habitCompletion: { habit_id: string; completed_at: string | null }) => {
  // TODO: Implement after creating Rails HabitCompletion model and controller
  // const data = await fetchWithCredentials(`${API_BASE_URL}/api/v1/habit_completions`, {
  //   method: 'POST',
  //   body: JSON.stringify({ habit_completion: habitCompletion }),
  // });
  // return data;
  console.warn('createHabitCompletion: Not yet implemented - create Rails HabitCompletion model first');
  return null;
};

export const deleteHabitCompletion = async (id: string) => {
  // TODO: Implement after creating Rails HabitCompletion model and controller
  // await fetchWithCredentials(`${API_BASE_URL}/api/v1/habit_completions/${id}`, {
  //   method: 'DELETE',
  // });
  console.warn('deleteHabitCompletion: Not yet implemented - create Rails HabitCompletion model first');
  return null;
};
