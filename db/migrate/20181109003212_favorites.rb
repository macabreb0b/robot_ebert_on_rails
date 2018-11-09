class Favorites < ActiveRecord::Migration[5.1]
  def change
    create_table :favorites do |t|
        t.integer :movie_id, :null => false, :references => [:movies, :id]
        t.integer :user_id, :null => false, :references => [:users, :id]

        t.timestamps
    end

    add_index :favorites, [:movie_id, :user_id], unique: true
  end
end
