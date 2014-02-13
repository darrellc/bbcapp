module Refinery
  module Sermons
    module Admin
      class SpeakersController < ::Refinery::AdminController

        crudify :'refinery/sermons/speaker',
                :title_attribute => 'name', :xhr_paging => true

      end
    end
  end
end
