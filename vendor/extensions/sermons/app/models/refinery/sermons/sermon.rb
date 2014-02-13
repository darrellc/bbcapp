module Refinery
  module Sermons
    class Sermon < Refinery::Core::BaseModel

      self.table_name = 'refinery_sermons'

      attr_accessible :title, :file_id, :date, :position



      acts_as_indexed :fields => [:title]

      validates :title, :presence => true, :uniqueness => true




      belongs_to :file, :class_name => '::Refinery::Resource'

    end
  end
end
