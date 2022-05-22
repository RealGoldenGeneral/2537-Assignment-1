function removeCartItems() {
    x = $(this).attr("id")
    $.ajax({
        type: "get",
        url: `/cart/delete/${x}`,
        success: () => {
            $(`${x}`).remove()
        }
    })
}

function loadItems() {
    $.ajax({
        type: "get",
        url: "/getCartItems",
        success: (data) => {
            console.log(data);
            for (i = 0; i < data.length; i++) {
                $("main").append(`<div id=${data[i]["_id"]} class="cartBlock">
                <img src="${data[i].cardImage}">
                <div>
                <h3>${data[i].name}</h3>
                <p>${data[i].price}</p>
                <button id=${data[i]["_id"]} class="remove">Remove</button>
                </div>
                </div>`)
            }
        }
    })
}

function setup() {
    loadItems()
    $(".remove").click(function() {
        removeCartItems()
    })
}

$(document).ready(setup)