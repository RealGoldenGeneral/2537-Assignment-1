const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.set('view engine', 'ejs');

app.listen(process.env.PORT || 5000, function (err) {
    if (err)
        console.log(err)
})

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/html/index.html')
})
const https = require('https')

app.get('/profile/:id', function (req, res) {
    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`
    data = ""
    https.get(url, function (https_res) {
        https_res.on("data", function (chunk) {
            data += chunk
            })
        https_res.on("end", function() {
            data = JSON.parse(data)
            abilities = data.abilities
            if (abilities.length == 3) {
                res.render("profile.ejs", {
                    "id": req.params.id,
                    "name": data.name,
                    "height": data.height,
                    "weight": data.weight,
                    "ability1": abilities[0].ability.name,
                    "ability2": abilities[1].ability.name,
                    "ability3": abilities[2].ability.name
                })
            } else if (abilities.length == 2) {
                res.render("profile.ejs", {
                    "id": req.params.id,
                    "name": data.name,
                    "height": data.height,
                    "weight": data.weight,
                    "ability1": abilities[0].ability.name,
                    "ability2": abilities[1].ability.name,
                    "ability3": ""
                })
            }
        })
    })
})

mongoose.connect("mongodb://localhost:27107/timeline", 
{useNewUrlParser: true, useUnifiedTopology: true });
const eventSchema = new mongoose.Schema({
    eventDescription: String,
    hits: Number,
    time: String
});
const timelineModel = mongoose.model("timeline", eventSchema);

app.get('/search', function (req, res) {
    res.sendFile(__dirname + '/public/html/search.html')
})

app.use(express.static("./public"))