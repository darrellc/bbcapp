module Refinery
  module Events
    class Engine < Rails::Engine
      include Refinery::Engine
      isolate_namespace Refinery::Events

      engine_name :refinery_sermons

      initializer "register refinerycms_sermon_groups plugin" do
        Refinery::Plugin.register do |plugin|
          plugin.name = "sermon_groups"
          plugin.url = proc { Refinery::Core::Engine.routes.url_helpers.events_admin_sermon_groups_path }
          plugin.pathname = root
          plugin.activity = {
            :class_name => :'refinery/events/sermon_group',
            :title => 'name'
          }
          plugin.menu_match = %r{refinery/events/sermon_groups(/.*)?$}
        end
      end

      config.after_initialize do
        Refinery.register_extension(Refinery::SermonGroups)
      end
    end
  end
end
