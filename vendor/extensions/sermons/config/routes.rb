Refinery::Core::Engine.routes.append do

  # Frontend routes
  namespace :sermons do
    resources :sermons, :path => '', :only => [:index, :show]
  end

  # Admin routes
  namespace :sermons, :path => '' do
    namespace :admin, :path => 'refinery' do
      resources :sermons, :except => :show do
        collection do
          post :update_positions
        end
      end
    end
  end


  # Frontend routes
  namespace :events do
    resources :sermon_groups, :only => [:index, :show]
  end

  # Admin routes
  namespace :events, :path => '' do
    namespace :admin, :path => 'refinery/events' do
      resources :sermon_groups, :except => :show do
        collection do
          post :update_positions
        end
      end
    end
  end


  # Frontend routes
  namespace :sermons do
    resources :services, :only => [:index, :show]
  end

  # Admin routes
  namespace :sermons, :path => '' do
    namespace :admin, :path => 'refinery/sermons' do
      resources :services, :except => :show do
        collection do
          post :update_positions
        end
      end
    end
  end


  # Frontend routes
  namespace :sermons do
    resources :speakers, :only => [:index, :show]
  end

  # Admin routes
  namespace :sermons, :path => '' do
    namespace :admin, :path => 'refinery/sermons' do
      resources :speakers, :except => :show do
        collection do
          post :update_positions
        end
      end
    end
  end

end
