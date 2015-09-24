(function ($, window) {
    'use strict';

    $(document).ready(function () {
        var $window = $(window),
            $body = $('body');

        var lightSlider, refreshLightSlider;

        var $lightSlider = $('#lightSlider');
        if ($lightSlider.length) {
            lightSlider = $lightSlider.lightSlider({item: 1, pager: false});

            var _lightSliderTimeout;
            refreshLightSlider = function (t) {
                t = t || 450;
                lightSlider.hide();
                clearTimeout(_lightSliderTimeout);
                _lightSliderTimeout = setTimeout(function () {
                    lightSlider.show().refresh();
                }, t);
            };
        }

        var _equalizerTimeout;
        var equalizeHeights = function (t) {
            var equalize = function () {
                var maxHeight = 0;
                $('.equalize').css('height', '').each(function () {
                    var parentHeight = $(this).parent().height();
                    if (parentHeight > maxHeight) maxHeight = parentHeight;
                }).height(maxHeight);
            };
            t = typeof t !== 'number' ? 400 : t;
            if (t > 0) {
                clearTimeout(_equalizerTimeout);
                _equalizerTimeout = setTimeout(equalize, t);
            } else {
                equalize();
            }
        };

        equalizeHeights(0);

        $window.on('resize', function () {
            equalizeHeights();
            var sidebarCollapsed = $body.hasClass('sidebar-collapsed');
            if ($window.width() < 1200) {
                if (!sidebarCollapsed) $body.addClass('sidebar-collapsed');
            } else if (sidebarCollapsed) {
                $body.removeClass('sidebar-collapsed');
            }
            if (typeof refreshLightSlider === 'function') refreshLightSlider();
        }).resize();

        $('.sidebar-toggle').on('click', function () {
            equalizeHeights();
            $body.toggleClass('sidebar-collapsed');
            if (typeof refreshLightSlider === 'function') refreshLightSlider();
        });
    });
})(jQuery, window);
