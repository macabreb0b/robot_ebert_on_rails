class CreateFavorites < ActiveRecord::Migration[5.1]
  def change
    create_table :favorites do |t|
      t.integer :movie_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end

    add_index :favorites, :user_id
    add_index :favorites, :movie_id
    add_index :favorites, [:movie_id, :user_id], unique: true
  end
end
