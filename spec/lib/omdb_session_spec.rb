require 'rails_helper'
require 'omdb_session'

describe 'omdb_url' do
  ENV['OMDB_API_KEY'] = 'the-magic-key'

  it 'generates omdb_url' do
    title = 'Tootsie'
    year = '2018'

    result = omdb_url(title, year)
    expect(result).to eq('http://www.omdbapi.com/?t=Tootsie&y=2018&r=json&plot=short&apikey=the-magic-key')
  end

  it 'strips whitespace from title' do
    title = 'Tootsie      '
    year = '2018'

    result = omdb_url(title, year)
    expect(result).to eq('http://www.omdbapi.com/?t=Tootsie&y=2018&r=json&plot=short&apikey=the-magic-key')
  end
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
