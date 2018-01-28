class Movie < ApplicationRecord
    has_many(
        :box_office_days,
        primary_key: :id,
        foreign_key: :movie_id,
        class_name: 'BoxOfficeDay'
    )

    def user_has_seen

    end

    def user_has_bookmarked

    end
end
