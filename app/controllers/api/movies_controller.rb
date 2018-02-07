class Api::MoviesController < ApplicationController
    def index
        @movies = Movie.order(:release_date).all
        render json: @movies.to_json
    end

    def show
        @movie = Movie.find(params[:id])
        render json: @movie.to_json(include: :box_office_days)
    end

    def bookmark
      require_logged_in

      @favorite = Favorite.new(
        user_id: current_user.id,
        movie_id: params[:movie_id]
      )
      if @favorite.save
        render json: @favorite
      else
        render json: @favorite.errors.full_messages, status: 422
      end
    end

    def unbookmark
      require_logged_in

      @favorite = Favorite.new(
        user_id: current_user.id,
        movie_id: params[:movie_id]
      )

      if @favorite.destroy
        render json: @favorite
      else
        render json: @favorite.errors.full_messages, status: 422
      end
    end

    def mark_seen

    end

    def mark_not_seen

    end
end