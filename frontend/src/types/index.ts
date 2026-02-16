export interface User {
  id: string;
  email: string;
  name: string;
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
  is_completed: boolean;
  completion_id: string | null;
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
export interface Column {
  id: string;
  name: string;
  position: number;
  tasks: Task[];
  user_id: string;
}

export interface Task {
  id: string;
  name: string;
  position: number;
  column_id: string;
}