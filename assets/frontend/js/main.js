/*global $, jQuery, alert, console, history*/
var appDevice = (function () {
    'use strict';
    
    var isMobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
    
    return {
        isMobile: isMobile,
        clickEvent: (isMobile) ? 'touchstart' : 'click'
    };
}());

(function ($) {
    'use strict';
    
    $(document).ready(function () {
        var $html = $('html'),
            $window = $(window);
        
        // test js
        if ($html.attr('class') === 'no-js') {
            $html.removeAttr('class');
            
        } else {
            $html.removeClass('no-js');
        }
        
        // test mobile
        if (appDevice.isMobile) {
            $html.addClass('js-mobile');
            
        } else {
            $html.addClass('js-desktop');
        }
        
        $html.addClass('page-loaded');
        
    });
}(jQuery));