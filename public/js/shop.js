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
        $.ajax({
            type: "get",
            url: `/getCard/${i}`,
            success: displayCard
        })

        if (i % 3 == 2) {
            to_add += `</div>`
        }
    }
}

function getTotal() {
    $.ajax({
        type: "get",
        url: "/getCardTotal",
        success: getCard
    })
}


function setup() {
    getTotal();
}

$(document).ready(setup)