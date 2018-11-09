# == Schema Information
#
# Table name: movies
#
#  id              :integer          not null, primary key
#  title           :string           not null
#  release_date    :date
#  year            :integer
#  mpaa_rating     :string
#  runtime         :integer
#  imdb_id         :string
#  bomojo_id       :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  box_office_data :jsonb            not null
#

class Movie < ApplicationRecord
    has_many(
        :box_office_days,
        primary_key: :id,
        foreign_key: :movie_id,
        class_name: 'BoxOfficeDay'
    )

    def user_has_favorited?(user_id)
        User.find(user_id).favorite_movies.include?(self)
    end

    def user_has_viewed?(user_id)
        User.find(user_id).viewed_movies.include?(self)
    end
end
