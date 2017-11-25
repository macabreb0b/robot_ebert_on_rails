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

ActiveRecord::Schema.define(version: 20171124231906) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "movie_metadata", force: :cascade do |t|
    t.integer "movie_id", null: false
    t.date "for_day", null: false
    t.integer "metacritic_score"
    t.float "imdb_rating"
    t.integer "imdb_vote_count"
    t.string "tomato_consensus"
    t.integer "tomato_meter"
    t.integer "tomato_review_count"
    t.integer "boxoffice_rank"
    t.integer "boxoffice_daily_gross"
    t.integer "boxoffice_theater_count"
    t.integer "boxoffice_todate_gross"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["movie_id", "for_day"], name: "index_movie_metadata_on_movie_id_and_for_day", unique: true
  end

  create_table "movies", force: :cascade do |t|
    t.string "title", null: false
    t.date "release_date"
    t.string "mpaa_rating"
    t.integer "runtime"
    t.string "imdb_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
