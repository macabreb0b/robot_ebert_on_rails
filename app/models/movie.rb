class Movie < ApplicationRecord
    has_many(
        :box_office_days,
        primary_key: :id,
        foreign_key: :movie_id,
        class_name: 'BoxOfficeDay'
    )
end
