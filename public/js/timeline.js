function loadEvents() {
    $.ajax({
        url: "https://polar-refuge-74063.herokuapp.com/timeline/getAllEvents",
        type: 'get',
        success: (data)=>{
            console.log(data)
            for(i = 0; i < data.length; i++) {
                $("main").append(`<div id="timeBlock" id="${data[i]["_id"]}">
                <p> Description: ${data[i].eventDescription} ${data[i].time}</p>
                <p> Hits: ${data[i].hits} </p>
                <button class="like" id="${data[i]["_id"]}"> Accurate </button>
                <button class="delete" id="${data[i]["_id"]}"> Delete </button>`)
            }
        }
    })
}

function increaseHits() {
    x = this._id
    $.ajax({
        url: `https://polar-refuge-74063.herokuapp.com/timeline/increaseHits/${x}`,
        type: "get",
        success: function (x) {
            console.log(x)
        }
    })
}

function deleteElements() {
    x = this._id
    $.ajax({
        url: `https://polar-refuge-74063.herokuapp.com/timeline/delete/${x}`,
        type: "get",
        success: function () {
            $(`"#${x}"`).remove()
        }
    })
}

function setup() {
    loadEvents()
    $("body").on("click", ".like", increaseHits)
    $("body").on("click", ".delete", deleteElements)
}

$(document).ready(setup)