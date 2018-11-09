Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
  }

  namespace :api, defaults: {format: :json} do
    resources :movies, only: [:index, :show]

    get 'timeline', to: 'box_office_days#timeline'
  end

  root to: 'static_pages#root'
  get 'timeline', to: 'static_pages#root'
  get 'movies/:id', to: 'static_pages#root'
end
