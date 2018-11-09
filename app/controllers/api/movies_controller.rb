class Api::MoviesController < ApplicationController
  include DeviseHelper

  def index
    @movies = Movie.order(:release_date).all
    movies_json = []
    @movies.each do |movie|
        movie_json = movie.as_json
        movie_json[:is_favorited] = movie.user_has_favorited? current_user.id
        movie_json[:is_viewed] = movie.user_has_viewed? current_user.id

        movies_json << movie_json
    end

    render json: movies_json
  end

  def show
    @movie = Movie.find(params[:id])
    render json: @movie.to_json(include: :box_office_days)
  end
end