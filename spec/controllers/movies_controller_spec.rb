require 'rails_helper'

RSpec.describe Api::MoviesController, type: :controller do
  describe 'GET #index' do
    it 'returns all movies as JSON objects' do
      get :index

      expect(response).to have_http_status(200)
    end
  end

  describe 'GET #show' do
    it 'returns single movie as JSON object' do
      # TODO: add factorygirl movie factory
      # TODO: resolve issue with DB not being reset
      movie = Movie.create!(title: 'some movie', box_office_data: {})

      get :show, params: {id: movie.id}

      expect(response).to have_http_status(200)
    end
  end
end
