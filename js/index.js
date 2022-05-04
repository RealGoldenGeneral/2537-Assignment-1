
to_add = ''

function finishprocessPokeResp(data) {
    for (i = 0; i < data.genera.length; i++) {
        if (data.genera[i].language.name == "en") {
            to_add += `<p>
            ${data.genera[i].genus}
            </p>
            </div>`
        }
    }
}

function processPokeResp(data){
    to_add += `<div class="image_container">
    <a href="/profile/${data.id}">
    <img src="${data.sprites.other["official-artwork"].front_default}">
    </a>
    <p>
    <h4>${data.name}</h4>
    </p>`
}

async function loadRandomPokemon() {
    for (i = 1; i <= 9; i++) {
        if (i % 3 == 1) {
            to_add += `<div class="images_group">`
        }

        x = Math.floor(Math.random * 1126) + 1

        if (x > 897) {
            x = (x - 897) + 10000 
        }

        await $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${x}/`,
            success: processPokeResp
        })

        await $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon-species/${x}/`,
            success: finishprocessPokeResp
        })



        if (i % 3 == 0) {
            to_add += `</div>`
        }
    }
    jQuery("main").html(to_add)
}

function setup() {
    loadRandomPokemon();
}

jQuery(document).ready(setup)