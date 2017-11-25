class Movie < ApplicationRecord
    has_many(
        :metadata,
        primary_key: :id,
        foreign_key: :movie_id,
        class_name: 'MovieMetadatum'
    )
end
