require "responsive_images/rails/engine"
require "responsive_images/version"
require "responsive_images/config"
require 'responsive_images/railtie' if defined?(Rails)

module ResponsiveImages
  
  extend Config
  
  class << self  
    def initialize attrs={}
      attrs = ResponsiveImages.options.merge(attrs)
      Config::VALID_OPTION_KEYS.each do |key|
        instance_variable_set("@#{key}".to_sym, attrs[key])
      end
    end
  end  
  
end
