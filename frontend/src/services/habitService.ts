import { API_ENDPOINTS, fetchWithCredentials } from '../config/api';
import { useState, useEffect, useCallback } from 'react';
import { Habit, HabitCompletion } from '../types';

export const useGetHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithCredentials(API_ENDPOINTS.habits);
      setHabits(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch habits');
    } finally {
      setLoading(false);
    }
  }, []);

  console.log(habits, "habits");

  return { habits, error, loading, execute };
};

export const useCreateHabit = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [habit, setHabit] = useState<Habit | null>(null);

  const execute = useCallback(async (habit: { label: string; weekly_target: number }): Promise<Habit> => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithCredentials(API_ENDPOINTS.habits, {
        method: 'POST',
        body: JSON.stringify({ habit }),
      });
      setHabit(data);
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create habit';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  return { habit, error, loading, execute };
}; 

export const useUpdateHabit = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [habit, setHabit] = useState<Habit | null>(null);

  const execute = useCallback(async (habit: { label: string; weekly_target: number }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithCredentials(API_ENDPOINTS.habits, {
        method: 'PUT',
        body: JSON.stringify({ habit }),
      });
      setHabit(data);
    } catch (err: any) {
      setError(err.message || 'Failed to update habit');
    } finally {
      setLoading(false);
    }
  }, []);
  return { habit, error, loading, execute };
};

export const useDeleteHabit = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [habit, setHabit] = useState<Habit | null>(null);

  const execute = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithCredentials(`${API_ENDPOINTS.habits}/${id}`, {
        method: 'DELETE',
      }); 
      setHabit(data);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to delete habit';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  return { habit, error, loading, execute };
};

export const useGetHabitCompletions = () => {
  const [habitCompletions, setHabitCompletions] = useState<HabitCompletion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithCredentials(API_ENDPOINTS.habitCompletions);
      setHabitCompletions(data);
    } catch (err: any) { 
      setError(err.message || 'Failed to fetch habit completions');
    } finally {
      setLoading(false);
    }
  }, []);
  return { habitCompletions, error, loading, execute };
};

export const useCreateHabitCompletion = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [habitCompletion, setHabitCompletion] = useState<HabitCompletion | null>(null);

  const execute = useCallback(async (habit_completion: { habit_id: string }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithCredentials(API_ENDPOINTS.habitCompletions, {
        method: 'POST',
        body: JSON.stringify({ habit_completion }),
      });
      setHabitCompletion(data);
    } catch (err: any) {
      setError(err.message || 'Failed to create habit completion');
    } finally {
      setLoading(false);
    }
  }, []);
  return { habitCompletion, error, loading, execute };
};

export const useDeleteHabitCompletion = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [habitCompletion, setHabitCompletion] = useState<HabitCompletion | null>(null);

  const execute = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithCredentials(`${API_ENDPOINTS.habitCompletions}/${id}`, {
        method: 'DELETE',
      }); 
      setHabitCompletion(data);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to delete habit completion';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []); 
  return { habitCompletion, error, loading, execute }
};