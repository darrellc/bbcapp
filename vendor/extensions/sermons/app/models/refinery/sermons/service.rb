module Refinery
  module Sermons
    class Service < Refinery::Core::BaseModel

      attr_accessible :name, :position



      acts_as_indexed :fields => [:name]

      validates :name, :presence => true, :uniqueness => true



    end
  end
end
