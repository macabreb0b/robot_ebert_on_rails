class CreateMovies < ActiveRecord::Migration[5.1]
    def change
        create_table :movies do |t|
            t.string :title, null: false
            t.date :release_date
            t.string :mpaa_rating
            t.integer :runtime
            t.string :imdb_id

            t.timestamps
        end
        
        create_table :movie_metadata do |t|
            t.integer :movie_id, :null => false, :references => [:movies, :id]
            t.date :for_day, null: false

            t.integer :metacritic_score

            t.float :imdb_rating
            t.integer :imdb_vote_count

            t.string :tomato_consensus
            t.integer :tomato_meter
            t.integer :tomato_review_count
            
            t.integer :boxoffice_rank
            t.integer :boxoffice_daily_gross
            t.integer :boxoffice_theater_count
            t.integer :boxoffice_todate_gross

            t.timestamps
        end

        add_index :movie_metadata, [:movie_id, :for_day], unique: true
    end
end
