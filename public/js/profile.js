function processPokeResp(data) {
    for (j = 0; j < data.genera.length; j++) {
        if (data.genera[j].language.name == "en") {
            to_add += `<p>${data.genera[j].genus}</p>`
        }
    }
    for (k = 0; k < data.flavor_text_entries.length; k++) {
        if (data.flavor_text_entries[k].lanuage.name == "en") {
            to_add += `<div class="flavor_text">
            <p>${data.flavor_text_entries.flavor_text}</p>
            </div>
            </div>`
        }
    }
}

async function loadPokemonInformation() {
    id = $(span).text();

    await $.ajax({
        type: "GET",
        url: `https://pokeapi.co/api/v2/pokemon-species/${x}/`,
        success: processPokeResp()
    })
}

function setup() {
    loadPokemonInformation();
}

$(document).ready(setup)