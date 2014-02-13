module Refinery
  module Sermons
    class Engine < Rails::Engine
      include Refinery::Engine
      isolate_namespace Refinery::Sermons

      engine_name :refinery_sermons

      initializer "register refinerycms_services plugin" do
        Refinery::Plugin.register do |plugin|
          plugin.name = "services"
          plugin.url = proc { Refinery::Core::Engine.routes.url_helpers.sermons_admin_services_path }
          plugin.pathname = root
          plugin.activity = {
            :class_name => :'refinery/sermons/service',
            :title => 'name'
          }
          plugin.menu_match = %r{refinery/sermons/services(/.*)?$}
        end
      end

      config.after_initialize do
        Refinery.register_extension(Refinery::Services)
      end
    end
  end
end
