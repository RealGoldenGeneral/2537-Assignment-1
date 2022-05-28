firstCard = undefined
secondCard = undefined

firstCardHasBeenFlipped = false

pokemonPairs = {}
pokemon_array = []

function createCards() {
    $.ajax({
        type: "post",
        data: ({
            gameSize: $("#gridSize").val()
        }),
        url: "/gameSize",
        success: (data) => {
            if (data == "incorrect information") {
                $("main").append("<p>Invalid game size.</p>")
            } else {
                boardSize = parseInt(data[0]) * parseInt(data[2])
                for (i = 0; i < boardSize / 2; i++) {
                    x = Math.floor(Math.random() * 897) + 1
                    pokemon_array[i] = x
                    if (i > 1)
                        for (m = 1; m < i - 1; m++) {
                            if (x == pokemon_array[m]) {
                                x = Math.floor(Math.random() * 897) + 1
                                pokemon_array[i] = x
                            }
                        }
                    pokemonPairs[x] = 0
                }
                for (j = 0; j < boardSize; j++) {
                    x = Math.floor(Math.random() * 4)
                    if (pokemonPairs[pokemon_array[x]] == 2) {
                        x = Math.floor(Math.random() * 4)
                    }
                    if (j == 0) {
                        $("main").html("<div id='game_grid'>")
                    }
                    $.ajax({
                        type: "get",
                        url: `https://pokeapi.co/api/v2/pokemon/${pokemon_array[x]}`,
                        success: (data) => {
                            $("#game_grid").append(`<div class="card">
                            <img id="img${j + 1}" class="front_face" src="${data.sprites.other["official-artwork"].front_default}" alt="">
                            <img class="back_face" src="back.jpg" alt="">
                            </div>`)
                        }
                    })
                    if (j == boardSize - 1) {
                        $("main").append("</div>")
                    }
                }
            }
        }
    })
}

function setup() {
    $("#submit").click(createCards)
    $(".card").on("click", function () {
        $(this).toggleClass("flip")

        if (!firstCardHasBeenFlipped) {
            // the first card
            firstCard = $(this).find(".front_face")[0]
            // console.log(firstCard);
            firstCardHasBeenFlipped = true
        } else {
            // this is the 2nd card
            secondCard = $(this).find(".front_face")[0]
            firstCardHasBeenFlipped = false
            console.log(firstCard, secondCard);
            // ccheck if we have match!
            if (
                $(`#${firstCard.id}`).attr("src")
                ==
                $(`#${secondCard.id}`).attr("src")
            ) {
                console.log("a match!");
                // update the game state
                // disable clicking events on these cards
                $(`#${firstCard.id}`).parent().off("click")
                $(`#${secondCard.id}`).parent().off("click")
            } else {
                console.log("not a match");
                // unflipping
                setTimeout(() => {
                    $(`#${firstCard.id}`).parent().removeClass("flip")
                    $(`#${secondCard.id}`).parent().removeClass("flip")
                }, 1000)
            }
            firstCard = undefined
            secondCard = undefined
        }
    })
}

$(document).ready(setup)