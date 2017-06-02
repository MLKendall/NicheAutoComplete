$(function() {
    var cssLink = $('#cssRef');
    $('#changeTheme').on("click", function() {
        if (cssLink.attr('href') == 'css/theme1.css') {
            $("#cssRef").attr("href", "css/theme2.css");
        } else {
            $("#cssRef").attr("href", "css/theme1.css");
        }
    });
});
