$(document).ready(function () {
    clean_board();

    let turn = 0;
    let attempts = 0;
    let players = ["player-x", "player-o"];
    let icons = ["fa-solid fa-times text-danger", "fa-regular fa-circle text-primary"]

    let play = [];

    $("#restart").on("click", function () {
        clean_board();
        turn = 0;
        attempts = 0;
        play = [];
    });

    $(".cell").on("click", function () {
        if (!$(this).hasClass("empty"))
            return;

        $(this).removeClass("empty");
        $(this).append(`<i class="${icons[turn]}"></i>`);
        let col = parseInt($(this).attr("col"));
        let row = parseInt($(this).attr("row"));

        play.push({
            row: row,
            col: col,
        });
        attempts++;

        result = final_move(play, attempts)
        if (result.final) {
            switch (result.winner) {
                case "x":
                    $("#restart").removeClass("hidden");
                    $("#result").removeClass("hidden");
                    $("#result").append('<span>Ganador: </span><i class="fa fa-solid fa-times"></i>');
                    break;
                case "o":    
                    $("#restart").removeClass("hidden");
                    $("#result").removeClass("hidden");
                    $("#result").append('<span>Ganador: </span><i class="fa fa-regular fa-circle"></i>');
                    break;
                default:
                    $("#restart").removeClass("hidden");
                    $("#result").removeClass("hidden");
                    $("#result").append('Es un empate!');
            }

            $(".cell").removeClass("empty");
            show_confetti();
            return
        }

        $(`#${players[turn]}`).removeClass("active");
        $(`#${players[turn]} span`).addClass("hidden");

        if (turn == 0)
            turn = 1;
        else
            turn = 0;

        $(`#${players[turn]} span`).removeClass("hidden");
        $(`#${players[turn]}`).addClass("active");
    });
});

function clean_board() {
    $(".cell").empty();
    $(".cell").not(".empty").addClass("empty");
    $("#result").empty();
    $("#result").addClass("hidden");
    $("#restart").addClass("hidden");

    $("#player-x").addClass("active");
    $("#player-x span").removeClass("hidden");
    $("#player-o").removeClass("active");
    $("#player-o span").addClass("hidden");
}

function final_move(play, attempts) {
    if (attempts == 9) 
        return {
            final: true,
            winner: ""
        }

    // indexes [0,1,2] are for rows, [3,4,5] are for columns, [6] is for diagonal, [7] is for anti-diagonal
    counters = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
    for (let i = 0; i < play.length; i++) {
        counters[i % 2][play[i].row]++;
        counters[i % 2][play[i].col + 3]++;

        if (play[i].row == play[i].col) 
            counters[i % 2][6]++;

        if (play[i].row + play[i].col == 2) 
            counters[i % 2][7]++;

        if (counters[0].includes(3))
            return {
                final: true,
                winner: "x"
            }
        else if (counters[1].includes(3))
            return {
                final: true,
                winner: "o"
            }

        console.log(counters)
    }

    return {
        final: false,
        winner: ""
    }
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