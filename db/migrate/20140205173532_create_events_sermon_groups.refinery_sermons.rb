# This migration comes from refinery_sermons (originally 2)
class CreateEventsSermonGroups < ActiveRecord::Migration

  def up
    create_table :refinery_events_sermon_groups do |t|

      t.string :name

      t.string :start_date

      t.integer :position

      t.timestamps
    end

  end

  def down
    if defined?(::Refinery::UserPlugin)
      ::Refinery::UserPlugin.destroy_all({:name => "refinerycms-events"})
    end

    if defined?(::Refinery::Page)
      ::Refinery::Page.delete_all({:link_url => "/events/sermon_groups"})
    end

    drop_table :refinery_events_sermon_groups

  end

end
