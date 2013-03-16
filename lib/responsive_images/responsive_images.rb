module ResponsiveImages
  module Activator
  
    class << self
      def initialize attrs={}
        attrs = ResponsiveImages.options.merge(attrs)
        Config::VALID_OPTION_KEYS.each do |key|
          instance_variable_set("@#{key}".to_sym, attrs[key])
        end
      end
    end

  end
end