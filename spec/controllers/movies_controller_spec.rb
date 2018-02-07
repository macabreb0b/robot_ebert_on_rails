require 'rails_helper'

RSpec.describe Api::MoviesController, type: :controller do
  describe 'GET #index' do
    it 'returns all movies as JSON objects' do
      get :index

      # here we check to make sure that the response renders back the new template
      expect(response).to have_http_status(200)
    end
  end

  describe 'GET #show' do
    it 'returns single movie as JSON object' do
      Movie.create!(title: 'some movie', box_office_data: {})

      get :show, params: {id: 1}

      expect(response).to have_http_status(200)
    end
  end
end
