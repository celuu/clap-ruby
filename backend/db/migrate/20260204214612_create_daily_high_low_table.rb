class CreateDailyHighLowTable < ActiveRecord::Migration[7.0]
  def change
    create_table :daily_high_low_tables do |t|
      t.date :date
      t.text :high_content
      t.text :low_content
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
