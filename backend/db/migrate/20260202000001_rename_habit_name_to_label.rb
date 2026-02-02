class RenameHabitNameToLabel < ActiveRecord::Migration[7.0]
  def change
    rename_column :habits, :name, :label
  end
end
