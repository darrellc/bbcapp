module Refinery
  module Events
    class SermonGroupsController < ::ApplicationController

      before_filter :find_all_sermon_groups
      before_filter :find_page

      def index
        # you can use meta fields from your model instead (e.g. browser_title)
        # by swapping @page for @sermon_group in the line below:
        present(@page)
      end

      def show
        @sermon_group = SermonGroup.find(params[:id])

        # you can use meta fields from your model instead (e.g. browser_title)
        # by swapping @page for @sermon_group in the line below:
        present(@page)
      end

    protected

      def find_all_sermon_groups
        @sermon_groups = SermonGroup.order('position ASC')
      end

      def find_page
        @page = ::Refinery::Page.where(:link_url => "/sermon_groups").first
      end

    end
  end
end
