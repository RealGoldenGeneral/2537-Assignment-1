to_add = ""

function createHeading(data) {
    to_add += `<h3>${data.name}</h3>`
}

function processPokeResp(data) {
    for (j = 0; j < data.genera.length; j++) {
        if (data.genera[j].language.name == "en") {
            to_add += `<p>${data.genera[j].genus}</p>`
        }
    }
    for (k = 0; k < data.flavor_text_entries.length; k++) {
        if (data.flavor_text_entries[k].language.name == "en" && data.flavor_text_entries[k].version.name == "shield") { // For gen 8 pokemon
            to_add += `<div class="flavour_text">
            <p>${data.flavor_text_entries[k].flavor_text}</p>
            </div>
            </div>`
            break
        }
        else if (data.flavor_text_entries[k].language.name == "en" && data.flavor_text_entries[k].version.name == "alpha-sapphire") { // For other generations
            to_add += `<div class="flavour_text">
            <p>${data.flavor_text_entries[k].flavor_text}</p>
            </div>
            </div>`
            break
        }
        else if (data.flavor_text_entries[k].language.name == "en" && data.flavor_text_entries[k].version.name == "ultra-moon") { // For gen 7 pokemon that didn't appear in gen 8
            to_add += `<div class="flavour_text">
            <p>${data.flavor_text_entries[k].flavor_text}</p>
            </div>
            </div>`
            break
        }
    }
}

async function loadPokemonInformation() {
    id = $("#pokeid").text();
    idNum = parseInt(id);

    await $.ajax({
        type: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/${idNum}/`,
        success: createHeading
    })

    await $.ajax({
        type: "GET",
        url: `https://pokeapi.co/api/v2/pokemon-species/${idNum}/`,
        success: processPokeResp
    })
    $("#information").html(to_add)
}

function setup() {
    loadPokemonInformation();
}

$(document).ready(setup)