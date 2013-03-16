# lib/my_gem/railtie.rb
require 'responsive_images/view_helpers'
require "mobvious"

module ResponsiveImages
  class Railtie < ::Rails::Railtie
    
    # Add our view helpers
    initializer "responsive_images.view_helpers" do
      ActionView::Base.send :include, ViewHelpers
    end
    
    # Add the mobvious middleware
    initializer "railtie.configure_rails_initialization" do |app|
      app.middleware.use Mobvious::Manager
    end
    
    # Configure Mobvious and setup the mobile tablet and desktop groups
    Mobvious.configure do |config|
      config.strategies = [ Mobvious::Strategies::MobileESP.new(:mobile_tablet_desktop) ]
    end
    
  end
end