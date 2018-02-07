Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :movies, only: [:index, :show]
    resources :favorites, only: [:create, :destroy]
    resources :seen_movies, only: [:create, :destroy]

    post 'users', to: 'users#create'
    post 'session', to: 'session#create'
    delete 'session', to: 'session#destroy'

    get 'timeline', to: 'box_office_days#timeline'
  end

  root to: 'static_pages#root'
  get 'timeline', to: 'static_pages#root'
  get 'movies/:id', to: 'static_pages#root'
  get 'login', to: 'static_pages#root'
  get 'signup', to: 'static_pages#root'
end
