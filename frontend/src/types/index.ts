// Global TypeScript type definitions

export interface User {
  id: string;
  email: string;
  // Add more fields as needed
}

export interface Weather {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

export interface Habit {
  id: string;
  label: string;
  weekly_target: number;
}
export interface HabitCompletion {
  id: string;
  habit_id: string;
  completed_at: string | null;
}

export interface HighLow {
  id: string;
  high_content: string;
  low_content: string;
  date: string;
  created_at?: string;
  updated_at?: string;
}

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  goals: string;
  created_at: string;
  updated_at: string;
}