require 'rails_helper'
require 'omdb_session'

describe '#omdb_url' do
  around do |test_case|
    ClimateControl.modify OMDB_API_KEY: 'some-omdb-api-key' do
      test_case.run
    end
  end

  it 'generates omdb_url' do
    title = 'Tootsie'
    year = '2018'

    result = omdb_url(title, year)
    expect(result).to eq('http://www.omdbapi.com/?t=Tootsie&y=2018&r=json&plot=short&apikey=some-omdb-api-key')
  end

  it 'strips whitespace from title' do
    title = 'Tootsie      '
    year = '2018'

    result = omdb_url(title, year)
    expect(result).to eq('http://www.omdbapi.com/?t=Tootsie&y=2018&r=json&plot=short&apikey=some-omdb-api-key')
  end
end

describe '#omdb_urls_to_try' do
  around do |test_case|
    ClimateControl.modify OMDB_API_KEY: 'some-omdb-api-key' do
      test_case.run
    end
  end

  context 'when title contains year' do
    it 'uses the year specified in movie title' do
      title = 'Robocop (2014)'

      result = omdb_urls_to_try(title)
      expect(result).to eq([
                             'http://www.omdbapi.com/?t=Robocop&y=2014&r=json&plot=short&apikey=some-omdb-api-key'
                           ])
    end
  end

  context 'when title does not contain year' do
    it 'guesses this year, last year (in that order)' do
      title = 'Robocop'

      result = omdb_urls_to_try(title)
      expect(result).to eq([
                             "http://www.omdbapi.com/?t=Robocop&y=#{Date.today.year}&r=json&plot=short&apikey=some-omdb-api-key",
                             "http://www.omdbapi.com/?t=Robocop&y=#{Date.today.year - 1}&r=json&plot=short&apikey=some-omdb-api-key"
                           ])
    end
  end
end

describe 'OMDBSession::get_movie_data' do
  it 'gets movie data !external' do
    title = 'Robocop (2014)'

    omdb_data = OMDBSession.get_movie_data(title)
    expect(omdb_data).to eq(OMDBMetaData.new(
                              mpaa_rating: 'PG-13',
                              year: 2014,
                              release_date: Date.parse('12 Feb 2014'),
                              imdb_id: 'tt1234721',
                              runtime: '117 min'
    ))
  end
end
