class Habit < ApplicationRecord
  belongs_to :user
  has_many :habit_completions, dependent: :destroy
  
  validates :label, presence: true
  validates :weekly_target, presence: true, numericality: { greater_than: 0 }

  def is_completed
    habit_completions.exists?(completed_at: Time.zone.today.all_day)
  end
end