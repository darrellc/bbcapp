
FactoryGirl.define do
  factory :speaker, :class => Refinery::Sermons::Speaker do
    sequence(:name) { |n| "refinery#{n}" }
  end
end

