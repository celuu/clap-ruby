Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # Authentication routes
      post '/signup', to: 'registrations#create'
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
      get '/current_user', to: 'sessions#show'
      
      # Profile routes
      get '/profile', to: 'profiles#show'
      put '/profile', to: 'profiles#update'
      
      # Add your habit and other resource routes here
    end
  end
end
