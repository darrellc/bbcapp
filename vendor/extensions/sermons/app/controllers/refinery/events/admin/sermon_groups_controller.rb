module Refinery
  module Events
    module Admin
      class SermonGroupsController < ::Refinery::AdminController

        crudify :'refinery/events/sermon_group',
                :title_attribute => 'name', :xhr_paging => true

      end
    end
  end
end
