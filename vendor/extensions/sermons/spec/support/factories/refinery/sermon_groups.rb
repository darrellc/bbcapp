
FactoryGirl.define do
  factory :sermon_group, :class => Refinery::Events::SermonGroup do
    sequence(:name) { |n| "refinery#{n}" }
  end
end

