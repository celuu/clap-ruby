class CreateHabitTables < ActiveRecord::Migration[7.0]
  def change
    create_table :habits do |t|
      t.string :name
      t.timestamps
    end
    create_table :habit_completions do |t|
      t.references :users, null: false, foreign_key: true
      t.references :habits, null: false, foreign_key: true
      t.datetime :completed_at

      t.timestamps
    end
  end
end
