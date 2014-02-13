# This migration comes from refinery_sermon_sets (originally 1)
class CreateSermonSetsSermonSets < ActiveRecord::Migration

  def up
    create_table :refinery_sermon_sets do |t|

      t.string :title

      t.datetime :start_date

      t.integer :position

      t.timestamps
    end

  end

  def down
    if defined?(::Refinery::UserPlugin)
      ::Refinery::UserPlugin.destroy_all({:name => "refinerycms-sermon_sets"})
    end

    if defined?(::Refinery::Page)
      ::Refinery::Page.delete_all({:link_url => "/sermon_sets/sermon_sets"})
    end

    drop_table :refinery_sermon_sets

  end

end
