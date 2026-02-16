Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # Authentication routes
      post '/signup', to: 'registrations#create'
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
      get '/current_user', to: 'sessions#show'

     resources :habits
     resources :habit_completions, only: [:create, :destroy]
     resources :daily_high_lows, only: [:show, :create]
     resources :columns, only: [:index, :create, :update, :destroy]
     resources :tasks, only: [:create, :update, :destroy]

    end
  end
end
