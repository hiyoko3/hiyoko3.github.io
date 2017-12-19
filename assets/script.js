$(function () {
    var pageTopBtn = $('#page-top');
    var height = 150;
    if ($(this).scrollTop() < height) {
        pageTopBtn.hide();
    }
    $(window).scroll(function () {
        ($(this).scrollTop() > height) ? pageTopBtn.fadeIn() : pageTopBtn.fadeOut();
    });
    pageTopBtn.on('click', function (e) {
        $("html,body").animate({scrollTop: 0}, 500, 'swing');
    });
    $(".button-collapse").sideNav();
});

function initMap() {
    var POSITIONS = [
        {id: "map-koriyama", center: {lat: 34.648078, lng: 135.790295}},
        {id: "map-hitachi", center: {lat: 36.590654, lng: 140.662153}}
    ];
    for (var i = 0; i < POSITIONS.length; i++) {
        var map = new google.maps.Map(document.getElementById(POSITIONS[i].id), {
            zoom: 16,
            center: POSITIONS[i].center
        });
        var marker = new google.maps.Marker({position: POSITIONS[i].center, map: map});
    }
}