$(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    const PAIRS = params.get('pairs');
    const TOTAL_PAIRS = PAIRS == 1 ? 6 : 9;
    const TOPIC = params.get('topic');

    $("#tablero").append(load_cards(TOPIC - 1, TOTAL_PAIRS));

    let tick_tack = start_timer($("#timer span"));
    let attempts = 0;
    let pairs = 0;

    $(".front img").on("click", async function () {
        let parent = $(this).parent().parent();

        if (parent.hasClass("flip") || parent.hasClass("match"))
            return;

        parent.addClass("flip");

        if ($(".flip").not(".match").length != 2)
            return;

        if (match($(".flip").not(".match"))) 
            pairs++;
        else {
            await sleep(1000);
            $(".flip").not(".match").removeClass("flip")
        }

        attempts++;
        $("#attempts span").text(attempts);

        if (pairs == TOTAL_PAIRS) {
            clearInterval(tick_tack);
            show_confetti();
            $("#result").text(`Finalizado en ${attempts} intentos!`);
            $("#result").removeClass('hidden');
            $("#restart").removeClass('hidden');
        }
    });

    $("#play-memory").on("click", function () {
        let pairs = $(`#config-memory #pairs`).val();
        let topic = $(`#config-memory #topic`).val();

        window.location.href= window.location.href.replace(`pairs=${PAIRS}&topic=${TOPIC}`, `pairs=${pairs}&topic=${topic}`);
    });
});

function load_cards(topic, pairs) {
    let html = '';
    if (pairs == 6) {
        cards = generate_random(pairs);

        for (let i = 1; i <= cards.length; i++) {
            if (i % 4 == 1)
                html += '<div class="row memory-cards">'

            html += `
                <div class="col-md-3 text-center card" data-value="${cards[i - 1]}">
                    <div class="face front">
                        <img src="../img/memory/reverse.png" alt="Reverse" />
                    </div>
                    <div class="face back">
                        <img src="${TOPICS[topic][cards[i - 1]].img}" alt="${TOPICS[topic][cards[i - 1]].name}" />
                    </div>
                </div>`;

            if (i % 4 == 0 || i == cards.length)
                html += '</div>'
        }
    } else if (pairs == 9) {
        cards = generate_random(pairs);

        for (let i = 1; i <= cards.length; i++) {
            if (i % 6 == 1)
                html += '<div class="row memory-cards">'

            html += `
                <div class="col-md-2 text-center card" data-value="${cards[i - 1]}">
                    <div class="face front">
                        <img src="../img/memory/reverse.png" alt="Reverse" />
                    </div>
                    <div class="face back">
                        <img src="${TOPICS[topic][cards[i - 1]].img}" alt="${TOPICS[topic][cards[i - 1]].name}" />
                    </div>
                </div>`;

            if (i % 6 == 0 || i == cards.length)
                html += '</div>'
        }
    }

    return html;
}

function generate_random(pairs) {
    let cards = [];
    let numbers = [];

    // Create an array of numbers from 0 to pairs-1
    for (let i = 0; i < pairs; i++) {
        numbers.push(i);
    }

    // Shuffle the numbers randomly
    for (let i = pairs - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    // Duplicate each number to create pairs
    for (let number of numbers) {
        cards.push(number, number);
    }

    // Shuffle the cards randomly
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]]; 
    }

    return cards;
}

function match(cards) {
    if ($(cards["0"]).attr("data-value") == $(cards["1"]).attr("data-value")) {
        $(cards["0"]).addClass("match");
        $(cards["1"]).addClass("match");
        return true;
    }
    
    return false;
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

const TOPICS = [
    [
        {
            name: 'IA',
            img: '../img/memory/informatics/ai.png'
        },
        {
            name: 'Big data',
            img: '../img/memory/informatics/big-data.png'
        },
        {
            name: 'Binario',
            img: '../img/memory/informatics/codigo-binario.png'
        },
        {
            name: 'Hacker',
            img: '../img/memory/informatics/hacker.png'
        },
        {
            name: 'Codigo',
            img: '../img/memory/informatics/codigo.png'
        },
        {
            name: 'USB',
            img: '../img/memory/informatics/memoria-usb.png'
        },
        {
            name: 'Computadora',
            img: '../img/memory/informatics/ordenador-personal.png'
        },
        {
            name: 'Red de conexion',
            img: '../img/memory/informatics/red-de-conexion.png'
        },
        {
            name: 'Robot',
            img: '../img/memory/informatics/robot.png'
        }
    ],
    [
        {
            name: 'Ardilla',
            img: '../img/memory/animals/ardilla.png'
        },
        {
            name: 'Gato',
            img: '../img/memory/animals/gato.png'
        },
        {
            name: 'Leopardo',
            img: '../img/memory/animals/leopardo.png'
        },
        {
            name: 'Mono',
            img: '../img/memory/animals/mono.png'
        },
        {
            name: 'Oso panda',
            img: '../img/memory/animals/oso-panda.png'
        },
        {
            name: 'Perro',
            img: '../img/memory/animals/perro.png'
        },
        {
            name: 'Pinguino',
            img: '../img/memory/animals/pinguino.png'
        },
        {
            name: 'Pulpo',
            img: '../img/memory/animals/pulpo.png'
        },
        {
            name: 'Rana',
            img: '../img/memory/animals/rana.png'
        }
    ],
    [
        {
            name: 'Baloncesto',
            img: '../img/memory/sports/baloncesto.png'
        },
        {
            name: 'Beisbol',
            img: '../img/memory/sports/beisbol.png'
        },
        {
            name: 'Boxeo',
            img: '../img/memory/sports/boxeo.png'
        },
        {
            name: 'Ciclismo',
            img: '../img/memory/sports/ciclocross.png'
        },
        {
            name: 'Futbol americano',
            img: '../img/memory/sports/futbol-americano.png'
        },
        {
            name: 'Futbol',
            img: '../img/memory/sports/futbol.png'
        },
        {
            name: 'Hockey',
            img: '../img/memory/sports/hockey.png'
        },
        {
            name: 'Tenis de mesa',
            img: '../img/memory/sports/ping-pong.png'
        },
        {
            name: 'Voleibol',
            img: '../img/memory/sports/volleyball.png'
        }
    ]
];