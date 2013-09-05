module ResponsiveImages
  module ViewHelpers

    
    # Use mobvious to get the user's device type, it will return mobile, tablet or desktop
    def device_type
      return request.env['mobvious.device_type']
    end
    
    
    # Create a image tag with our responsive image data attributes
    def responsive_image_tag image, options={}
      # Merge any options passed with the configured options
      sizes = ResponsiveImages.options.deep_merge(options)  
      # Let's create a hash of the alternative options for our data attributes    
      data_sizes = alternative_sizes(image, sizes)
      # Get the image source
      image_src = src_path(image, sizes)      
      # Return the image tag with our responsive data attributes
      return image_tag image_src, data_sizes
    end
    
    
    def responsive_background_image image, options={}
      # Merge any options passed with the configured options
      sizes = ResponsiveImages.options.deep_merge(options)
      data_hash = { style: "background-image: url(#{src_path(image, sizes)})" }.merge(alternative_sizes(image, sizes))      
    end
  
    
    # Let's identify the default image size for the image tag. If it's a desktop then our
    # default src attribute should be desktop (or default) but if it's a mobile or table
    # then we should set the src attribute to the mobile or tablet image
    def src_path image, sizes
      case device_type
      when :desktop
        image_src = sizes[:default] == :default ? image.url : image.url.send(sizes[:default])
      when :tablet
        image_src = sizes[:sizes][:tablet].present? ? image.url.send(sizes[:sizes][:tablet]) : image.url.send(sizes[:default])
      when :mobile
        image_src = sizes[:sizes][:mobile].present? ? image.url.send(sizes[:sizes][:mobile]) : image.url.send(sizes[:default])
      end
    end
    
    
    # Loop over the images sizes and create our data attributes hash
    def alternative_sizes image, sizes
      data_sizes = {}
      sizes[:sizes].each do |size, value|
        if value.present?
          data_sizes["data-#{size}-src"] = (value == :default ? image.url : image.url.send(value))
        else
          false
        end
      end
      data_sizes
    end
        
        
  end  
end
