to_add = ''
css_add = ''

function colourChooser(data) {
    type = []
    firstColour = ""
    secondColour = ""
    if (data.id < 899) {
        for (l = 0; l < data.types.length; l++) {
            type[l] = data.types[l].type.name
        }

        for (k = 0; k < type.length; k++) {
            if (type[k] == "normal") {
                if (k == 0) {
                    firstColour = "wheat"
                }
                if (k == 1) {
                    secondColour = "wheat"
                }
            }
            if (type[k] == "fighting") {
                if (k == 0) {
                    firstColour = "maroon"
                }
                if (k == 1) {
                    secondColour = "maroon"
                }
            }
            if (type[k] == "flying") {
                if (k == 0) {
                    firstColour = "lightskyblue"
                }
                if (k == 1) {
                    secondColour = "lightskyblue"
                }
            }
            if (type[k] == "poison") {
                if (k == 0) {
                    firstColour = "darkviolet"
                }
                if (k == 1) {
                    secondColour = "darkviolet"
                }
            }
            if (type[k] == "ground") {
                if (k == 0) {
                    firstColour = "sandybrown"
                }
                if (k == 1) {
                    secondColour = "sandybrown"
                }
            }
            if (type[k] == "rock") {
                if (k == 0) {
                    firstColour = "darkgoldenrod"
                }
                if (k == 1) {
                    secondColour = "darkgoldenrod"
                }
            }
            if (type[k] == "bug") {
                if (k == 0) {
                    firstColour = "olive"
                }
                if (k == 1) {
                    secondColour = "olive"
                }
            }
            if (type[k] == "ghost") {
                if (k == 0) {
                    firstColour = "rebeccapurple"
                }
                if (k == 1) {
                    secondColour = "rebeccapurple"
                }
            }
            if (type[k] == "steel") {
                if (k == 0) {
                    firstColour = "dimgrey"
                }
                if (k == 1) {
                    secondColour = "dimgrey"
                }
            }
            if (type[k] == "fire") {
                if (k == 0) {
                    firstColour = "orange"
                }
                if (k == 1) {
                    secondColour = "orange"
                }
            }
            if (type[k] == "water") {
                if (k == 0) {
                    firstColour = "dodgerblue"
                }
                if (k == 1) {
                    secondColour = "dodgerblue"
                }
            }
            if (type[k] == "grass") {
                if (k == 0) {
                    firstColour = "forestgreen"
                }
                if (k == 1) {
                    secondColour = "forestgreen"
                }
            }
            if (type[k] == "electric") {
                if (k == 0) {
                    firstColour = "yellow"
                }
                if (k == 1) {
                    secondColour = "yellow"
                }
            }
            if (type[k] == "psychic") {
                if (k == 0) {
                    firstColour = "orchid"
                }
                if (k == 1) {
                    secondColour = "orchid"
                }
            }
            if (type[k] == "ice") {
                if (k == 0) {
                    firstColour = "cyan"
                }
                if (k == 1) {
                    secondColour = "cyan"
                }
            }
            if (type[k] == "dragon") {
                if (k == 0) {
                    firstColour = "darkviolet"
                }
                if (k == 1) {
                    secondColour = "darkviolet"
                }
            }
            if (type[k] == "dark") {
                if (k == 0) {
                    firstColour = "#705848"
                }
                if (k == 1) {
                    secondColour = "#705848"
                }
            }
            if (type[k] == "fairy") {
                if (k == 0) {
                    firstColour = "pink"
                }
                if (k == 1) {
                    secondColour = "pink"
                }
            }
        }
        if (k == 1) {
            css_add = `"background-color: ${firstColour}"`
        }
        if (k == 2) {
            css_add = `"background-image: linear-gradient(${firstColour}, ${secondColour})"`
        }
    }
}

async function finishDisplayingPokemon(data) {
    for (j = 0; j < data.genera.length; j++) {
        if (data.genera[j].language.name == "en") {
            to_add += `<p>
            ${data.genera[j].genus}
            </p>
            </div>`
        }
    }
}

async function displayPokemon(data) {
    if (data.id < 899) {
        to_add += `<div class="image_container" style=${css_add}>
    <a href="/profile/${data.id}">
    <img src="${data.sprites.other["official-artwork"].front_default}">
    </a>
    <h4>${data.name}</h4>`

       await $.ajax({
            type: "get",
            url: `https://pokeapi.co/api/v2/pokemon-species/${data.id}`,
            success: finishDisplayingPokemon
        })
    }
}

async function getPokemon(data) {
    for (i = 0; i < data.pokemon.length; i++) {
        if (i % 3 == 0) {
            to_add += `<div class="images_group">`
        }
       await $.ajax({
            type: "get",
            url: data.pokemon[i].pokemon.url,
            success: colourChooser
        })

       await $.ajax({
            type: "get",
            url: data.pokemon[i].pokemon.url,
            success: displayPokemon
        })

        if (i % 3 == 2) {
            to_add += await `</div>`
        }
    }
    $("main").html(to_add)
}

function getAbility(ability_) {
    $("main").empty()
    to_add = ''
    css_add = ''
    $.ajax({
        type: "get",
        url: `https://pokeapi.co/api/v2/ability/${ability_}`,
        success: getPokemon
    })
}

function getName(name_) {
    $("main").empty()
    to_add = ''
    css_add = ''
    $.ajax({
        type: "get",
        url: `https://pokeapi.co/api/v2/pokemon/${name_}`,
        success: colourChooser
    })
    $.ajax({
        type: "get",
        url: `https://pokeapi.co/api/v2/pokemon/${name_}`,
        success: displayPokemon
    })
}

function getType(type_) {
    $("main").empty()
    to_add = ''
    css_add = ''
    $.ajax({
        type: "get",
        url: `https://pokeapi.co/api/v2/type/${type_}`,
        success: getPokemon
    })
}

function displayAbility(checked) {
    if (checked == "on") {
        $("#name").val("")
        $("#type").val("")
        $("input[type:text]").css("display", "inline")
        getName($("#search").val())

        $(document).on ('change', '#search', () => {
            poke_name = $(("#search").val())
            getAbility($("#search").val())
        })
    }
}

function displayName(checked) {
    if (checked == "on") {
        $("#type").val("")
        $("#ability").val("")
        $("input[type:text]").css("display", "inline")
        getName($("#search").val())

        $(document).on ('change', '#search', () => {
            poke_name = $(("#search").val())
            getName($("#search").val())
        })
    }
}

function displayType(checked) {
    if (checked == "on") {
        $("#name").val("")
        $("#ability").val("")
        $("select").css("display", "inline")
        getType($("#poke_type option:selected").val())

        $(document).on('change', '#poke_type', () => {
            poke_type = $("#poke_type option:selected").val();
            getType($("#poke_type option:selected").val())
        })
    }
}

function setup() {
    displayType($("#type:checked").val())
    displayName($("#name:checked").val())
    $("#type").change(() => {
        nameChecked = $("#type:checked").val();
        displayType($("#type:checked").val())
    })
    $("#name").change(() => {
        nameChecked = $("#name:checked").val();
        displayName($("#name:checked").val())
    })
}

$(document).ready(setup)