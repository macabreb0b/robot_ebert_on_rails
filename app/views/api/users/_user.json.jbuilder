json.extract! user, :id, :username
json.favorite_movies user.favorite_movies.pluck(:id)
json.seen_movies user.seen_movies.pluck(:id)
