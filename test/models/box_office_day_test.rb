# == Schema Information
#
# Table name: box_office_days
#
#  id                    :integer          not null, primary key
#  movie_id              :integer          not null
#  day                   :date             not null
#  metacritic_score      :integer
#  imdb_rating           :integer
#  imdb_vote_count       :integer
#  tomato_consensus      :string
#  tomato_meter          :integer
#  tomato_review_count   :integer
#  bomojo_rank           :integer
#  bomojo_daily_gross    :integer
#  bomojo_to_date_gross  :integer
#  bomojo_theater_count  :integer
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  tomato_audience_score :integer
#

require 'test_helper'

class BoxOfficeDayTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
