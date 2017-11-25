Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do 
    resources :movies, only: [:index, :show]
    resources :favorites, only: [:index]
  end

  root to: "static_pages#root"
end
