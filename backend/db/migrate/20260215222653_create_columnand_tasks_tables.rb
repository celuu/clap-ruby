class CreateColumnandTasksTables < ActiveRecord::Migration[7.0]
  def change
    create_table :columns do |t|
      t.string :name, null: false
      t.integer :position
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end

    create_table :tasks do |t|
      t.string :name, null: false
      t.integer :position
      t.references :column, null: false, foreign_key: true
      t.timestamps
    end
  end
end
