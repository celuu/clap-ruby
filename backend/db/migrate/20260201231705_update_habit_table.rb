class UpdateHabitTable < ActiveRecord::Migration[7.0]
  def change
    add_column :habits, :user_id, :integer
    add_foreign_key :habits, :users
    add_column :habits, :weekly_target, :integer
  end
end
