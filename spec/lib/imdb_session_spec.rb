require 'rails_helper'
require 'imdb_session'

describe 'IMDBSession::get_movie_data' do
  it 'gets data about old movie' do
    robocop_2_imdb_id = 'tt0100502'

    imdb_data = IMDBSession.get_movie_data(robocop_2_imdb_id)

    expect(imdb_data.imdb_rating).to eq(58)
    expect(imdb_data.imdb_vote_count).to eq(70257)
    expect(imdb_data.metacritic_rating).to be nil
  end

  it 'gets data about new(ish) movie' do
    disturbia_imdb_id = 'tt0486822'

    imdb_data = IMDBSession.get_movie_data(disturbia_imdb_id)

    expect(imdb_data.imdb_rating).to eq(69)
    # TODO: how do I test this if it changes over time.. could test > x
    expect(imdb_data.imdb_vote_count).to eq(198783)
    expect(imdb_data.metacritic_rating).to eq(62)
  end
end
