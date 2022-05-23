function displayOrders(data) {
    console.log(data)
    for(j = 0; j < data.length; j++) {
        $("#orderHistory").append(`<div class="orderBlock">
        <img src="${data[j].cardImage}">
        <p>${data[j].name}</p>
        <p>${data[j].price}</p>
        </div>`)
    }
}

function createOrders() {
    $.ajax({
        url: "/getPreviousOrders",
        type: "get",
        success: displayOrders
    })
}

function increaseHits() {
    x = $(this).attr("id")
    $.ajax({
        url: `https://polar-refuge-74063.herokuapp.com/timeline/increaseHits/${x}`,
        type: "get",
        success: () => {
            $("main").empty()
            loadEvents();
        }
    })
}

function deleteElements() {
    x = $(this).attr("id")
    $.ajax({
        url: `https://polar-refuge-74063.herokuapp.com/timeline/delete/${x}`,
        type: "get",
        success: function () {
            $(`#${x}`).remove()
        }
    })
}

function displayEvents(data) {
    console.log(data)
    for (i = 0; i < data.length; i++) {
        $("#timeline").append(`<div id="${data[i]["_id"]}" class="timeBlock">
                <p> Description: ${data[i].eventDescription} ${data[i].time}</p>
                <p> User: ${data[i].user} </p>
                <p> Hits: ${data[i].hits} </p>
                <button class="like" id="${data[i]["_id"]}"> Accurate </button>
                <button class="delete" id="${data[i]["_id"]}"> Delete </button>`)
    }
}

function createEvents() {
    $.ajax({
        type: "get",
        url: "/timeline/getAllEventsOfUser",
        success: displayEvents
    })
}

function setup() {
    createEvents();
    createOrders();
    $("body").on("click", ".like", increaseHits)
    $("body").on("click", ".delete", deleteElements)
}

$(document).ready(setup)