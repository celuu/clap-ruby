class HabitCompletion < ApplicationRecord
  belongs_to :user
  belongs_to :habit
  
  validates :habit_id, presence: true
  validates :user_id, presence: true
end