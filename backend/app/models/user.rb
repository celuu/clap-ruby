class User < ApplicationRecord
  has_secure_password
  
  has_many :habits, dependent: :destroy
  has_many :habit_completions, dependent: :destroy
  
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true
  validates :password, length: { minimum: 6 }, if: -> { new_record? || !password.nil? }
end
