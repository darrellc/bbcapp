module Refinery
  module Sermons
    class Engine < Rails::Engine
      include Refinery::Engine
      isolate_namespace Refinery::Sermons

      engine_name :refinery_sermons

      initializer "register refinerycms_speakers plugin" do
        Refinery::Plugin.register do |plugin|
          plugin.name = "speakers"
          plugin.url = proc { Refinery::Core::Engine.routes.url_helpers.sermons_admin_speakers_path }
          plugin.pathname = root
          plugin.activity = {
            :class_name => :'refinery/sermons/speaker',
            :title => 'name'
          }
          plugin.menu_match = %r{refinery/sermons/speakers(/.*)?$}
        end
      end

      config.after_initialize do
        Refinery.register_extension(Refinery::Speakers)
      end
    end
  end
end
