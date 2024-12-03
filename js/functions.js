$(document).ready(function () {
    $("#play-memory").on("click", function () {
        let modal = $(this).attr("data-game");
        let pairs = $(`#config-${modal} #pairs`).val();
        let topic = $(`#config-${modal} #topic`).val();

        window.location.href= window.location.href.replace("index.html", `views/memory.html?pairs=${pairs}&topic=${topic}`);
    });

    $("#play-puzzle").on("click", function () {
        let modal = $(this).attr("data-game");
        let image = $(`#config-${modal} .image.selected`).attr("data-image");

        window.location.href= window.location.href.replace("index.html", `views/puzzle.html?image=${image}`);
    });

    $(".image").on("click", function () {
        $(".image").removeClass("selected"); 
        $(this).addClass("selected"); 
    });
});