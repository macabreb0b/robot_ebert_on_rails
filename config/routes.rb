Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
  }

  namespace :api, defaults: {format: :json} do
    resources :movies, only: [:index, :show]

    post '/movies/:id/favorite', to: 'movies#post_favorite'
    delete '/movies/:id/favorite', to: 'movies#delete_favorite'
    post '/movies/:id/view', to: 'movies#post_movie_view'
    delete '/movies/:id/view', to: 'movies#delete_movie_view'

    get 'timeline', to: 'box_office_days#timeline'
  end

  root to: 'static_pages#root'
  get 'timeline', to: 'static_pages#root'
  get 'movies/:id', to: 'static_pages#root'
end
