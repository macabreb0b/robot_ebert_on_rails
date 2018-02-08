require 'rails_helper'
require 'omdb_session'

describe 'omdb_url' do
  pending 'generates omdb_url'
end

describe 'omdb_urls_to_try' do
  context 'when title contains year' do
    pending 'uses the year specified in movie title'
  end

  context 'when title does not contain year' do
    pending 'guesses this year, last year (in that order)'
  end
end

RSpec.describe OMDBSession do
  describe '::get_movie_data' do
    pending 'gets movie data'
  end
end
