$(document).ready(function () {
    $(".tabs .nav a").on("click", function (e) {
        e.preventDefault();

        var $tab = $(this),
            fileToLoad = $tab.attr("href"),
            $nav = $tab.parents('.nav'),
            $content = $nav.siblings('.content');

        // Prevent the same tab from being reloaded
        if ($tab.hasClass("selected")) {
            return false;
        }

        // check if section for content should be added
        if (!$content.length) {
            $content = $('<div>').addClass('content');
            $content.insertAfter($tab.parents('.nav'));
        }

        // change selected tab and load new content
        $nav.find('a').removeClass("selected");
        $content.fadeOut('slow', function () {
            $tab.addClass("selected");
            $(this).load(fileToLoad).fadeIn();
        });
    });

    $('.tabs .nav a:first').trigger('click');
});
