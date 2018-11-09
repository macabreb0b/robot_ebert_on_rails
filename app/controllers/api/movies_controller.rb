
def _format_movie_json(movie, current_user, include_box_office_days=false)
    movie_json = movie.as_json
    if current_user
        movie_json[:is_favorited] = movie.user_has_favorited? current_user.id
        movie_json[:is_viewed] = movie.user_has_viewed? current_user.id
    end

    return movie_json
end

class Api::MoviesController < ApplicationController
    include DeviseHelper

    def index
        @movies = Movie.order(:release_date).all
        movies_json = @movies.map do |movie|
            _format_movie_json movie, current_user
        end

        render json: movies_json
    end

    def show
        @movie = Movie.find(params[:id])
        render json: _format_movie_json(
            @movie,
            current_user,
            true
        )
    end

    def post_favorite
        @movie = Movie.find(params[:id])
        current_user.favorite_movies << @movie

        render json: _format_movie_json(
            @movie,
            current_user,
        )
    end

    def delete_favorite
        @movie = Movie.find(params[:id])
        current_user.favorite_movies.delete(@movie)

        render json: _format_movie_json(
            @movie,
            current_user,
        )
    end

    def post_movie_view
        @movie = Movie.find(params[:id])
        current_user.viewed_movies << @movie

        render json: _format_movie_json(
            @movie,
            current_user,
        )
    end

    def delete_movie_view
        @movie = Movie.find(params[:id])
        current_user.viewed_movies.delete(@movie)

        render json: _format_movie_json(
            @movie,
            current_user,
        )
    end
end