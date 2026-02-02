class FixHabitCompletionsForeignKeys < ActiveRecord::Migration[7.0]
  def change
    # Remove old foreign keys
    remove_foreign_key :habit_completions, column: :habits_id
    remove_foreign_key :habit_completions, column: :users_id
    
    # Rename columns to singular
    rename_column :habit_completions, :habits_id, :habit_id
    rename_column :habit_completions, :users_id, :user_id
    
    # Add back foreign keys with correct names
    add_foreign_key :habit_completions, :habits
    add_foreign_key :habit_completions, :users
  end
end
