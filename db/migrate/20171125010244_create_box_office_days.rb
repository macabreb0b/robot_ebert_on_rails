class CreateBoxOfficeDays < ActiveRecord::Migration[5.1]
    def change
        create_table :box_office_days do |t|
            t.integer :movie_id, :null => false, :references => [:movies, :id]
            t.date :day, null: false

            t.integer :metacritic_score

            t.float :imdb_rating
            t.integer :imdb_vote_count

            t.string :tomato_consensus
            t.integer :tomato_meter
            t.integer :tomato_review_count
            
            t.integer :bomojo_rank
            t.integer :bomojo_daily_gross
            t.integer :bomojo_to_date_gross
            t.integer :bomojo_theater_count

            t.timestamps
        end

        add_index :box_office_days, [:movie_id, :day], unique: true
    end
end
