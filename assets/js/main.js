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

            var $linksIndicators = $('.links-indicators');
            $linksIndicators.find('li a').on('click', function () {
                var $parent = $(this).parent();
                if ($parent.hasClass('active')) return;
                $parent.addClass('active').siblings().removeClass('active');
                lightSlider.goToSlide($parent.index());
            });

            var _lightSliderTimeout;
            refreshLightSlider = function (t) {
                t = t || 400;
                lightSlider.hide();
                $linksIndicators.hide();
                clearTimeout(_lightSliderTimeout);
                _lightSliderTimeout = setTimeout(function () {
                    lightSlider.show().refresh();
                    $linksIndicators.show();
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
            $owlCarousel.owlCarousel({
                navigation: true,
                navigationText: ['<i class="fa fa-angle-left fa-2x"></i>', '<i class="fa fa-angle-right fa-2x"></i>'],
                pagination: false
            });

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
            $body.toggleClass('sidebar-collapsed');
            equalizeHeights();
            if (typeof reinitOwl === 'function') reinitOwl();
            if (typeof refreshLightSlider === 'function') refreshLightSlider();
        });

        $('.hasDropdown a').on('click', function () {
            $(this).next('.google-dropdown').toggleClass('open');
        });
    });
})(jQuery, window);
