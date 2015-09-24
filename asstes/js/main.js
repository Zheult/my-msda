(function ($, window) {
    'use strict';

    $(document).ready(function () {
        var $window = $(window),
            $body = $('body');

        var $lightSlider = $('#lightSlider');
        if ($lightSlider.length) {
            var lsOptions = {item: 1, pager: false},
                lightSlider = $lightSlider.lightSlider(lsOptions);

            var _timeout;
            var refreshLightSlider = function (t) {
                t = t || 450;
                lightSlider.hide();
                clearTimeout(_timeout);
                _timeout = setTimeout(function () {
                    lightSlider.show().refresh();
                }, t);
            };

            $('.sidebar-toggle').on('click', function () {
                $body.toggleClass('sidebar-collapsed');
                refreshLightSlider();
            });

            $window.on('resize', function () {
                var sidebarCollapsed = $body.hasClass('sidebar-collapsed');
                if ($window.width() < 1200) {
                    if (!sidebarCollapsed) $body.addClass('sidebar-collapsed');
                } else if (sidebarCollapsed) {
                    $body.removeClass('sidebar-collapsed');
                }
                refreshLightSlider(800);
            });
        } else {
            $('.sidebar-toggle').on('click', function () {
                $body.toggleClass('sidebar-collapsed');
            });
        }
    });
})(jQuery, window);
