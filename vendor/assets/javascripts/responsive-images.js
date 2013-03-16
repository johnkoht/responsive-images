;(function($) {
  
  $.fn.responsive_images = function(options) {
    
    console.log("options:: ", options)
    
    // Default settings
    var defaults = {
      default_to_small : true,
      mobile_size: 300,
      tablet_size: 640,
      desktop_size: 980,
      elements : null,
      screen_width : 0,
      screen_height : 0,
    }
    
    var responsive_images = this;
            
    // Initialize the responsive images plugin
    var init = function() {

      // merge the default and optional seetings
      responsive_images.settings = $.extend({}, defaults, options);
      
      // Bind to resize and let's activate the resize handler immediately on load
      bind_to_resize();
      resize_handler();
      
    };
    
    
    
    // Bind to window resize event to trigger our resize handler
    var bind_to_resize = function() {
      $(window).resize(function() {
        responsive_images.settings.screen_width = $(window).width();
        responsive_images.settings.screen_height = $(window).height();
        resize_handler();
      });
    };
    
    
    var resize_handler = function() {      
      // Let's make sure the screen width and height are NOT set to 0. If so, let's set them
      // to the screen resolution
      if (responsive_images.settings.screen_width == 0 && responsive_images.settings.screen_height == 0) {
        responsive_images.settings.screen_width = $(window).width();
        responsive_images.settings.screen_height = $(window).height();        
      }      
      // Set up our array of sizes and the closest match as null
      var size = null;
      var size_key = null;
      var sizes = {
        mobile_size: defaults.mobile_size,
        tablet_size: defaults.tablet_size,
        desktop_size: defaults.desktop_size,
      };
      // Loop over our size array to figure out which size is the closest to our screen size
      $.each(sizes, function(key, value) {
        if (size == null || Math.abs(value - responsive_images.settings.screen_width) < Math.abs(size - responsive_images.settings.screen_width)) {
          size = value;
          size_key = key;
        };
      });
      responsive_images.update_images(size_key, size);      
    };
    
    
    // Update the actual images
    responsive_images.update_images = function(key, size) {
      // Set up our data attribute
      var data_attribute = "data-" + key.replace("_", "-").replace('size', 'src');      
      responsive_images.each(function(index, item) {
        // Let's make sure the data attribute exists
        if ( $(item).attr(data_attribute) != null ) {        
          // If the item is a div, let's set the background image
          if ( $(item).is('div') ) {
            $(item).css({
              "background-image" : 'url("' + $(item).attr(data_attribute) + '")',
              "background-size" : "auto",
            });
          }
          // If it's an image, let's just replace the source
          else if ( $(item).is('img') ) {
            $(item).attr('src', $(item).attr(data_attribute));
          };
        };
      });
    };
      
    // Initialize the plugin
    init();      
    
  };
  
    
})(jQuery);