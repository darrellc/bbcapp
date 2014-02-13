module Refinery
  module Events
    class SermonGroup < Refinery::Core::BaseModel

      attr_accessible :name, :start_date, :position



      acts_as_indexed :fields => [:name, :start_date]

      validates :name, :presence => true, :uniqueness => true



    end
  end
end
