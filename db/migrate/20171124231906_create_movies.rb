class CreateMovies < ActiveRecord::Migration[5.1]
    def change
        create_table :movies do |t|
            t.string :title, null: false

            t.date :release_date
            t.integer :year # can be different from release_date.year
            t.string :mpaa_rating
            t.integer :runtime

            t.string :imdb_id
            t.string :bomojo_id

            t.timestamps

            t.index :imdb_id, unique: true
            t.index :bomojo_id, unique: true
        end
    end
end
