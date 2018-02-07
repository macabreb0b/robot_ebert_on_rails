# == Schema Information
#
# Table name: movies
#
#  id              :integer          not null, primary key
#  title           :string           not null
#  release_date    :date
#  year            :integer
#  mpaa_rating     :string
#  runtime         :integer
#  imdb_id         :string
#  bomojo_id       :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  box_office_data :jsonb            not null
#

require 'test_helper'

class MovieTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
