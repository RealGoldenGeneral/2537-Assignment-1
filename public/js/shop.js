function displayCard(data) {
    $("main").append(`<div id="cardBlock">
    <img src=${data.images.large}>
    <p>${data.name}</p>
    <p>Price: $${data.tcgplayer.prices[0].market}</p>
    <button id="buy">Add to Cart</button>
    </div>`)
}

function getCard(data) {
    for (i = 0; i < data; i++) {
        if (i % 3 == 0) {
        to_add += `<div class="images_group">`
        }
        $.ajaxSetup({
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-Api-key', "bc186aa4-a677-4692-85f4-8e361dd471cc")
            }
        })
        $.ajax({
            type: "get",
            url: `https://api.pokemontcg.io/v2/cards/swsh9-${i}`,
            success: displayCard
        })

        if (i % 3 == 2) {
            to_add += `</div>`
        }
    }
}

function getTotal() {
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-Api-key', "bc186aa4-a677-4692-85f4-8e361dd471cc")
        }
    })
    $.ajax({
        type: "get",
        url: "https://api-pokemon.tcg.io/v2/set/swsh9",
        success: getCard
    })
}


function setup() {
    getTotal();
}

$(document).ready(setup)