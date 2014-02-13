# encoding: utf-8
require "spec_helper"

describe Refinery do
  describe "Events" do
    describe "Admin" do
      describe "sermon_groups" do
        login_refinery_user

        describe "sermon_groups list" do
          before do
            FactoryGirl.create(:sermon_group, :name => "UniqueTitleOne")
            FactoryGirl.create(:sermon_group, :name => "UniqueTitleTwo")
          end

          it "shows two items" do
            visit refinery.events_admin_sermon_groups_path
            page.should have_content("UniqueTitleOne")
            page.should have_content("UniqueTitleTwo")
          end
        end

        describe "create" do
          before do
            visit refinery.events_admin_sermon_groups_path

            click_link "Add New Sermon Group"
          end

          context "valid data" do
            it "should succeed" do
              fill_in "Name", :with => "This is a test of the first string field"
              click_button "Save"

              page.should have_content("'This is a test of the first string field' was successfully added.")
              Refinery::Events::SermonGroup.count.should == 1
            end
          end

          context "invalid data" do
            it "should fail" do
              click_button "Save"

              page.should have_content("Name can't be blank")
              Refinery::Events::SermonGroup.count.should == 0
            end
          end

          context "duplicate" do
            before { FactoryGirl.create(:sermon_group, :name => "UniqueTitle") }

            it "should fail" do
              visit refinery.events_admin_sermon_groups_path

              click_link "Add New Sermon Group"

              fill_in "Name", :with => "UniqueTitle"
              click_button "Save"

              page.should have_content("There were problems")
              Refinery::Events::SermonGroup.count.should == 1
            end
          end

        end

        describe "edit" do
          before { FactoryGirl.create(:sermon_group, :name => "A name") }

          it "should succeed" do
            visit refinery.events_admin_sermon_groups_path

            within ".actions" do
              click_link "Edit this sermon group"
            end

            fill_in "Name", :with => "A different name"
            click_button "Save"

            page.should have_content("'A different name' was successfully updated.")
            page.should have_no_content("A name")
          end
        end

        describe "destroy" do
          before { FactoryGirl.create(:sermon_group, :name => "UniqueTitleOne") }

          it "should succeed" do
            visit refinery.events_admin_sermon_groups_path

            click_link "Remove this sermon group forever"

            page.should have_content("'UniqueTitleOne' was successfully removed.")
            Refinery::Events::SermonGroup.count.should == 0
          end
        end

      end
    end
  end
end
