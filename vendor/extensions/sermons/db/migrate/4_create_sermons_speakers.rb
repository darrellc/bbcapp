class CreateSermonsSpeakers < ActiveRecord::Migration

  def up
    create_table :refinery_sermons_speakers do |t|

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
      ::Refinery::Page.delete_all({:link_url => "/sermons/speakers"})
    end

    drop_table :refinery_sermons_speakers

  end

end
