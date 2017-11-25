class CreateMovies < ActiveRecord::Migration[5.1]
    def change
        create_table :movies do |t|
            t.string :title, null: false
            t.date :release_date
            t.string :mpaa_rating
            t.integer :runtime

            t.string :imdb_id
            t.string :bomojo_id

            t.timestamps
        end
    end
end
