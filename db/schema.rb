# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180125045802) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "box_office_days", force: :cascade do |t|
    t.integer "movie_id", null: false
    t.date "day", null: false
    t.integer "metacritic_score"
    t.integer "imdb_rating"
    t.integer "imdb_vote_count"
    t.string "tomato_consensus"
    t.integer "tomato_meter"
    t.integer "tomato_review_count"
    t.integer "bomojo_rank"
    t.integer "bomojo_daily_gross"
    t.integer "bomojo_to_date_gross"
    t.integer "bomojo_theater_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "tomato_audience_score"
    t.index ["movie_id", "day"], name: "index_box_office_days_on_movie_id_and_day", unique: true
  end

  create_table "movies", force: :cascade do |t|
    t.string "title", null: false
    t.date "release_date"
    t.integer "year"
    t.string "mpaa_rating"
    t.integer "runtime"
    t.string "imdb_id"
    t.string "bomojo_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "best_box_office_rank"
    t.integer "days_at_best_box_office_rank"
    t.index ["bomojo_id"], name: "index_movies_on_bomojo_id", unique: true
    t.index ["imdb_id"], name: "index_movies_on_imdb_id", unique: true
  end

end
