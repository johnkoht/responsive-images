;(function($) {
  
  $.fn.responsive_images = function(options) {
    
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
      // Default image is considered the largest one
      var size_key = 'default_size';
      var sizes = [
        ['desktop_size', responsive_images.settings.desktop_size],
        ['tablet_size', responsive_images.settings.tablet_size],
        ['mobile_size', responsive_images.settings.mobile_size],
      ];
      // Iterate over sizes and find one which matches current screen size
      for(var i = 0; i < sizes.length; i++) {
        // If screen width is larger than any breakpoint
        if (responsive_images.settings.screen_width < sizes[i][1]) {
          size_key = sizes[i][0];
        }
      }      
      
      responsive_images.update_images(size_key);      
    };
    
    
    // Update the actual images
    responsive_images.update_images = function(key) {
      // Set up our data attribute
      var data_attribute = "data-" + key.replace("_", "-").replace('size', 'src');      
      responsive_images.each(function(index, item) {
        // Let's make sure the data attribute exists
        if ( $(item).attr(data_attribute) != null ) {        
          // If the item is a div, let's set the background image
          if ( $(item).is('div') ) {
            $(item).css({
              "background-image" : 'url("' + $(item).attr(data_attribute) + '")'
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
