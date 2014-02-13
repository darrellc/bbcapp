
FactoryGirl.define do
  factory :service, :class => Refinery::Sermons::Service do
    sequence(:name) { |n| "refinery#{n}" }
  end
end

