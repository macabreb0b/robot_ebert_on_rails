class Favorite < ApplicationRecord
  validates :user_id, uniqueness: {scope: :movie_id}

  belongs_to :movie
  belongs_to :user
end
