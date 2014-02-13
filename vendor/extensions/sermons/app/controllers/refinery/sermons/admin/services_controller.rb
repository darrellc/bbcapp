module Refinery
  module Sermons
    module Admin
      class ServicesController < ::Refinery::AdminController

        crudify :'refinery/sermons/service',
                :title_attribute => 'name', :xhr_paging => true

      end
    end
  end
end
