# This migration comes from refinery_sermons (originally 3)
class CreateSermonsServices < ActiveRecord::Migration

  def up
    create_table :refinery_sermons_services do |t|

      t.string :name

      t.integer :position

      t.timestamps
    end

  end

  def down
    if defined?(::Refinery::UserPlugin)
      ::Refinery::UserPlugin.destroy_all({:name => "refinerycms-sermons"})
    end

    if defined?(::Refinery::Page)
      ::Refinery::Page.delete_all({:link_url => "/sermons/services"})
    end

    drop_table :refinery_sermons_services

  end

end
