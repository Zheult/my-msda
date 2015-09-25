(function ($, window) {
    'use strict';

    $(document).ready(function () {
        var $window = $(window),
            $body = $('body');

        var reinitOwl;
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
            t = typeof t !== 'number' ? 400 : t;
            var $equalize = $('.equalize').css({height: 'auto', visibility: 'hidden'});
            clearTimeout(_equalizerTimeout);
            _equalizerTimeout = setTimeout(function () {
                var maxHeight = 0;
                $equalize.each(function () {
                    var height = $(this).height();
                    if (height > maxHeight) maxHeight = height;
                }).height(maxHeight).css({visibility: 'visible'});
            }, t);
        };

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

        var $owlCarousel = $('.owl-carousel');
        if ($owlCarousel.length) {
            $owlCarousel.owlCarousel({navigation: true, navigationText: ['<i class="fa fa-angle-left fa-2x"></i>', '<i class="fa fa-angle-right fa-2x"></i>'], pagination: false});

            var _owlTimeout;
            reinitOwl = function (t) {
                t = typeof t !== 'number' ? 400 : t;
                $owlCarousel.hide();
                clearTimeout(_owlTimeout);
                _owlTimeout = setTimeout(function () {
                    $owlCarousel.show().data('owlCarousel').reinit();
                }, t);
            };
        }

        $('.sidebar-toggle').on('click', function () {
            equalizeHeights();
            $body.toggleClass('sidebar-collapsed');
            if (typeof reinitOwl === 'function') reinitOwl();
            if (typeof refreshLightSlider === 'function') refreshLightSlider();
        });
    });
})(jQuery, window);
