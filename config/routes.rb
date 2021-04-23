Rails.application.routes.draw do
  post '/books', to: 'books#create'
  get  '/books/', to: 'books#index'
  get  '/books/:id', to: 'books#show'
end
