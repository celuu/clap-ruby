class CreateIntervalsTable < ActiveRecord::Migration[7.0]
  def change
    create_table :intervals do |t|
      t.string :name, null: false
      t.integer :time
      t.integer :index
      t.string :workout_type, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
