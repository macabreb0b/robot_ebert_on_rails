class Api::BoxOfficeDaysController < ApplicationController
    def timeline
        box_office_days = BoxOfficeDay.where(  # get the last 30 days by default
            day: (Date.today - 30)..(Date.today),
        ).where(
            bomojo_rank: 1..12,
        )
        movie_ids = box_office_days.map(&:movie_id).uniq
        movies = Movie.find(movie_ids)

        json_response = {
            box_office_days: box_office_days,
            movies: movies
        }
        render json: json_response
    end
end