module ResponsiveImages
  module Config
    
    VALID_OPTION_KEYS = [
      :default,
      :sizes
    ]
    
    attr_accessor *VALID_OPTION_KEYS
    
    def configure
      yield self
      self
    end
    
    def options
      options = {}
      VALID_OPTION_KEYS.each{ |pname| options[pname] = send(pname) }
      options
    end
    
    
    def responsive_sizes
      sizes
    end
        
  end
end