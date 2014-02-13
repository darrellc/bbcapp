# encoding: utf-8
require "spec_helper"

describe Refinery do
  describe "Sermons" do
    describe "Admin" do
      describe "speakers" do
        login_refinery_user

        describe "speakers list" do
          before do
            FactoryGirl.create(:speaker, :name => "UniqueTitleOne")
            FactoryGirl.create(:speaker, :name => "UniqueTitleTwo")
          end

          it "shows two items" do
            visit refinery.sermons_admin_speakers_path
            page.should have_content("UniqueTitleOne")
            page.should have_content("UniqueTitleTwo")
          end
        end

        describe "create" do
          before do
            visit refinery.sermons_admin_speakers_path

            click_link "Add New Speaker"
          end

          context "valid data" do
            it "should succeed" do
              fill_in "Name", :with => "This is a test of the first string field"
              click_button "Save"

              page.should have_content("'This is a test of the first string field' was successfully added.")
              Refinery::Sermons::Speaker.count.should == 1
            end
          end

          context "invalid data" do
            it "should fail" do
              click_button "Save"

              page.should have_content("Name can't be blank")
              Refinery::Sermons::Speaker.count.should == 0
            end
          end

          context "duplicate" do
            before { FactoryGirl.create(:speaker, :name => "UniqueTitle") }

            it "should fail" do
              visit refinery.sermons_admin_speakers_path

              click_link "Add New Speaker"

              fill_in "Name", :with => "UniqueTitle"
              click_button "Save"

              page.should have_content("There were problems")
              Refinery::Sermons::Speaker.count.should == 1
            end
          end

        end

        describe "edit" do
          before { FactoryGirl.create(:speaker, :name => "A name") }

          it "should succeed" do
            visit refinery.sermons_admin_speakers_path

            within ".actions" do
              click_link "Edit this speaker"
            end

            fill_in "Name", :with => "A different name"
            click_button "Save"

            page.should have_content("'A different name' was successfully updated.")
            page.should have_no_content("A name")
          end
        end

        describe "destroy" do
          before { FactoryGirl.create(:speaker, :name => "UniqueTitleOne") }

          it "should succeed" do
            visit refinery.sermons_admin_speakers_path

            click_link "Remove this speaker forever"

            page.should have_content("'UniqueTitleOne' was successfully removed.")
            Refinery::Sermons::Speaker.count.should == 0
          end
        end

      end
    end
  end
end
