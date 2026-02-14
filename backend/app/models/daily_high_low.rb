class DailyHighLow < ApplicationRecord
  self.table_name = 'high_lows'
  
  belongs_to :user
  validates :date, presence: true
end