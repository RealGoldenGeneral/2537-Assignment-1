firstCard = undefined
secondCard = undefined

firstCardHasBeenFlipped = false

pokemonPairs = {}
pokemon_array = []
to_add = ''
async function createCards(data) {
    if (data == "incorrect information") {
        $("main").append("<p>Invalid game size.</p>")
    } else {
        boardSize = parseInt(data[0]) * parseInt(data[2])
        rowSize = parseInt(data[2])
        for (i = 0; i < boardSize / 2; i++) {
            x = Math.floor(Math.random() * 897) + 1
            pokemon_array[i] = x
            if (i > 1)
                for (m = 1; m < i - 1; m++) {
                    while (x == pokemon_array[m]) {
                        x = Math.floor(Math.random() * 897) + 1
                        pokemon_array[i] = x
                    }
                }
            pokemonPairs[x] = 0
        }
        for (j = 0; j < boardSize; j++) {
            x = Math.floor(Math.random() * (boardSize / 2))
            while (pokemonPairs[pokemon_array[x]] == 2) {
                x = Math.floor(Math.random() * (boardSize / 2))
            }
            if (j == 0) {
                await $("main").html("<div id='game_grid'>")
            }
            await $.ajax({
                type: "get",
                url: `https://pokeapi.co/api/v2/pokemon/${pokemon_array[x]}`,
                success: (data) => {
                    $("#game_grid").append(`<div class="card">
                    <img id="img${j + 1}" class="front_face" src="${data.sprites.other["official-artwork"].front_default}" alt="">
                    <img class="back_face" src="../img/back.jpg" alt="">
                    </div>`)
                    pokemonPairs[pokemon_array[x]] += 1
                    $(".card").css("width", `calc(${100 / rowSize}% - 10px)`)
                    $(".card").css("height", `${100 / rowSize}%`)
                }
            })
            if (j == boardSize - 1) {
                await $("main").append("</div>")
            }
        }
    }
}

function getGameSize() {
    $.ajax({
        type: "post",
        data: ({
            gameSize: $("#gridSize").val()
        }),
        url: "/validateBoardSize",
        success: createCards
    })
}

function setup() {
    $("#submit").click(getGameSize)
    $("body").on("click", ".card", function () {
        $(this).attr("id", "flip")

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
                &&
                $(`#${firstCard.id}`).attr("id")
                !=
                $(`#${secondCard.id}`).attr("id")
            ) {
                console.log("a match!");
                // update the game state
                // disable clicking events on these cards
                $("body").off("click", `.${$(`#${firstCard.id}`).parent()[0].class}`)
                $("body").off("click", `.${$(`#${secondCard.id}`).parent()[0].class}`)
            } else {
                console.log("not a match");
                // unflipping
                setTimeout(() => {
                    $(`#${firstCard.id}`).parent().removeAttr("id")
                    $(`#${secondCard.id}`).parent().removeAttr("id")

                }, 1000)
            }
        }
    })
}

$(document).ready(setup)