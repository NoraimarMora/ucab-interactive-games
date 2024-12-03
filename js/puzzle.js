$(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    const IMAGE = params.get('image');

    $("#parts").append(load_cards(IMAGE - 1));

    let tick_tack = start_timer($("#timer span"));
    let attempts = 0;

    let dragged = null;
    $(".draggable").on("dragstart", function (event) {
        dragged = event.target;
    });

    $(".droppable").on("dragover", function (event) {
        event.preventDefault();
    });

    $(".droppable").on("drop", function (event) {
        attempts++;
        $("#attempts span").text(attempts);

        if ($(dragged.parentNode).attr("data-pos") != $(event.target).attr("data-pos")) {
            return;
        }

        dragged.parentNode.remove();
        $(dragged).attr("draggable", "false");
        event.target.append(dragged);

        if ($(".droppable img").length == 9) {
            clearInterval(tick_tack);
            show_confetti();
            $("#result").text(`Finalizado en ${attempts} intentos!`);
            $("#parts").addClass('hidden');
            $("#result").removeClass('hidden');
            $("#restart").removeClass('hidden');
        }
    });

    $("#play-puzzle").on("click", function () {
        let image = $(`#config-puzzle .image.selected`).attr("data-image");

        window.location.href= window.location.href.replace(`image=${IMAGE}`, `image=${image}`);
    })

    $(".image").on("click", function () {
        $(".image").removeClass("selected"); 
        $(this).addClass("selected"); 
    });
});

function clean_board() {
    $(".droppable").removeChild();

    $("#attempts span").text("0");
    $("#timer span").text("00:00");
}

function load_cards(image) {
    let html = '';

    order = [0, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5);
    for (let i = 0; i < order.length; i++) 
        html += `
            <div class="draggable" data-pos="${PARTS[image][order[i]].position}">
                <img src="${PARTS[image][order[i]].img}" alt="${PARTS[image][order[i]].name}" />
            </div>`;

    return html;
}

function show_confetti() {
    let count = 200;
    let defaults = {
        origin: { y: 0.7 }
    };

    let colors = ['#FFC526', '#40B4E5', '#047732'];

    fire(defaults, count, 0.25, {
        spread: 26,
        startVelocity: 55,
    }, colors);

    fire(defaults, count, 0.2, {
        spread: 60,
    }, colors);

    fire(defaults, count, 0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    }, colors);

    fire(defaults, count, 0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    }, colors);

    fire(defaults, count, 0.1, {
        spread: 120,
        startVelocity: 45,
    }, colors);
}

function fire(defaults, count, particleRatio, opts, colors) {
    confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        colors: colors
    });
}

function start_timer(display) {
    let minutes = 0;
    let seconds = 0;
    let timer = 0;

    return setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $(display).text(minutes + ":" + seconds);

        timer++;
    }, 1000);
}

const PARTS = [
    [
        {
            position: "1",
            img: "../img/puzzle/robot_1/part_1.png",
            name: "Parte 1"
        },
        {
            position: "2",
            img: "../img/puzzle/robot_1/part_2.png",
            name: "Parte 2"
        },
        {
            position: "3",
            img: "../img/puzzle/robot_1/part_3.png",
            name: "Parte 3"
        },
        {
            position: "4",
            img: "../img/puzzle/robot_1/part_4.png",
            name: "Parte 4"
        },
        {
            position: "5",
            img: "../img/puzzle/robot_1/part_5.png",
            name: "Parte 5"
        },
        {
            position: "6",
            img: "../img/puzzle/robot_1/part_6.png",
            name: "Parte 6"
        },
        {
            position: "7",
            img: "../img/puzzle/robot_1/part_7.png",
            name: "Parte 7"
        },
        {
            position: "8",
            img: "../img/puzzle/robot_1/part_8.png",
            name: "Parte 8"
        },
        {
            position: "9",
            img: "../img/puzzle/robot_1/part_9.png",
            name: "Parte 9"
        }
    ],
    [
        {
            position: "1",
            img: "../img/puzzle/programmer/part_1.png",
            name: "Parte 1"
        },
        {
            position: "2",
            img: "../img/puzzle/programmer/part_2.png",
            name: "Parte 2"
        },
        {
            position: "3",
            img: "../img/puzzle/programmer/part_3.png",
            name: "Parte 3"
        },
        {
            position: "4",
            img: "../img/puzzle/programmer/part_4.png",
            name: "Parte 4"
        },
        {
            position: "5",
            img: "../img/puzzle/programmer/part_5.png",
            name: "Parte 5"
        },
        {
            position: "6",
            img: "../img/puzzle/programmer/part_6.png",
            name: "Parte 6"
        },
        {
            position: "7",
            img: "../img/puzzle/programmer/part_7.png",
            name: "Parte 7"
        },
        {
            position: "8",
            img: "../img/puzzle/programmer/part_8.png",
            name: "Parte 8"
        },
        {
            position: "9",
            img: "../img/puzzle/programmer/part_9.png",
            name: "Parte 9"
        }
    ],
    [
        {
            position: "1",
            img: "../img/puzzle/lion/part_1.png",
            name: "Parte 1"
        },
        {
            position: "2",
            img: "../img/puzzle/lion/part_2.png",
            name: "Parte 2"
        },
        {
            position: "3",
            img: "../img/puzzle/lion/part_3.png",
            name: "Parte 3"
        },
        {
            position: "4",
            img: "../img/puzzle/lion/part_4.png",
            name: "Parte 4"
        },
        {
            position: "5",
            img: "../img/puzzle/lion/part_5.png",
            name: "Parte 5"
        },
        {
            position: "6",
            img: "../img/puzzle/lion/part_6.png",
            name: "Parte 6"
        },
        {
            position: "7",
            img: "../img/puzzle/lion/part_7.png",
            name: "Parte 7"
        },
        {
            position: "8",
            img: "../img/puzzle/lion/part_8.png",
            name: "Parte 8"
        },
        {
            position: "9",
            img: "../img/puzzle/lion/part_9.png",
            name: "Parte 9"
        }
    ],
    [
        {
            position: "1",
            img: "../img/puzzle/astronaut/part_1.png",
            name: "Parte 1"
        },
        {
            position: "2",
            img: "../img/puzzle/astronaut/part_2.png",
            name: "Parte 2"
        },
        {
            position: "3",
            img: "../img/puzzle/astronaut/part_3.png",
            name: "Parte 3"
        },
        {
            position: "4",
            img: "../img/puzzle/astronaut/part_4.png",
            name: "Parte 4"
        },
        {
            position: "5",
            img: "../img/puzzle/astronaut/part_5.png",
            name: "Parte 5"
        },
        {
            position: "6",
            img: "../img/puzzle/astronaut/part_6.png",
            name: "Parte 6"
        },
        {
            position: "7",
            img: "../img/puzzle/astronaut/part_7.png",
            name: "Parte 7"
        },
        {
            position: "8",
            img: "../img/puzzle/astronaut/part_8.png",
            name: "Parte 8"
        },
        {
            position: "9",
            img: "../img/puzzle/astronaut/part_9.png",
            name: "Parte 9"
        }
    ],
    [
        {
            position: "1",
            img: "../img/puzzle/robot_2/part_1.png",
            name: "Parte 1"
        },
        {
            position: "2",
            img: "../img/puzzle/robot_2/part_2.png",
            name: "Parte 2"
        },
        {
            position: "3",
            img: "../img/puzzle/robot_2/part_3.png",
            name: "Parte 3"
        },
        {
            position: "4",
            img: "../img/puzzle/robot_2/part_4.png",
            name: "Parte 4"
        },
        {
            position: "5",
            img: "../img/puzzle/robot_2/part_5.png",
            name: "Parte 5"
        },
        {
            position: "6",
            img: "../img/puzzle/robot_2/part_6.png",
            name: "Parte 6"
        },
        {
            position: "7",
            img: "../img/puzzle/robot_2/part_7.png",
            name: "Parte 7"
        },
        {
            position: "8",
            img: "../img/puzzle/robot_2/part_8.png",
            name: "Parte 8"
        },
        {
            position: "9",
            img: "../img/puzzle/robot_2/part_9.png",
            name: "Parte 9"
        }
    ],
    [
        {
            position: "1",
            img: "../img/puzzle/hacker/part_1.png",
            name: "Parte 1"
        },
        {
            position: "2",
            img: "../img/puzzle/hacker/part_2.png",
            name: "Parte 2"
        },
        {
            position: "3",
            img: "../img/puzzle/hacker/part_3.png",
            name: "Parte 3"
        },
        {
            position: "4",
            img: "../img/puzzle/hacker/part_4.png",
            name: "Parte 4"
        },
        {
            position: "5",
            img: "../img/puzzle/hacker/part_5.png",
            name: "Parte 5"
        },
        {
            position: "6",
            img: "../img/puzzle/hacker/part_6.png",
            name: "Parte 6"
        },
        {
            position: "7",
            img: "../img/puzzle/hacker/part_7.png",
            name: "Parte 7"
        },
        {
            position: "8",
            img: "../img/puzzle/hacker/part_8.png",
            name: "Parte 8"
        },
        {
            position: "9",
            img: "../img/puzzle/hacker/part_9.png",
            name: "Parte 9"
        }
    ]
];