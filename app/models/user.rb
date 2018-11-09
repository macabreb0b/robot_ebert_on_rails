class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
    :registerable,
    :recoverable,
    :rememberable,
    :validatable

  has_many :favorites
  has_many :favorite_movies, through: :favorites, source: :movie

  has_many :movie_views
  has_many :viewed_movies, through: :movie_views, source: :movie
end
