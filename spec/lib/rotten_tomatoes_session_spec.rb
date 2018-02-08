require 'rails_helper'
require 'rotten_tomatoes_session'

describe '#parse_title_and_year' do
  it 'finds year when title has year' do
    bomojo_title = 'Robocop (2014)'

    title, year = parse_title_and_year(bomojo_title)
    expect(title).to eq('Robocop')
    expect(year).to eq(2014)
  end

  it 'does not return year for title without year' do
    bomojo_title = 'Robocop'

    title, year = parse_title_and_year(bomojo_title)
    expect(title).to eq('Robocop')
    expect(year).to eq(nil)
  end

  it 'does not match non-year inside parens' do
    title_with_non_year_in_parens = 'Robocop (hello kitty)'

    title, year = parse_title_and_year(title_with_non_year_in_parens)
    expect(title).to eq('Robocop (hello kitty)')
    expect(year).to eq(nil)
  end

  it 'does not match non-year number inside parens' do
    title_with_non_year_in_parens = 'Robocop (20000)'

    title, year = parse_title_and_year(title_with_non_year_in_parens)
    expect(title).to eq('Robocop (20000)')
    expect(year).to eq(nil)
  end
end

describe '#rotten_tomatoes_urls_to_try' do
  context 'when title contains year' do
    it 'only guesses (1) year from title and (2) no year' do
      raise
    end
  end

  context 'when title does not contain year' do
    it 'guesses 2 recent years then no year' do
      raise
    end
  end
end

describe '#rotten_tomatoes_url' do
  context 'when called with year' do
    it 'generates url with year' do
      raise
    end
  end

  context 'when called without year' do
    it 'generates url without year' do
      raise
    end
  end
end

describe 'RottenTomatoesSession::get_movie_data' do
  it 'gets movie data !external' do
    raise
  end
end
