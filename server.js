const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyparser = require("body-parser")
app.set('view engine', 'ejs');

app.listen(process.env.PORT || 5000, function (err) {
    if (err)
        console.log(err)
})

app.use(bodyparser.urlencoded({
    extended: true
}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/html/index.html')
})
const https = require('https');
const res = require('express/lib/response');

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

app.get('/timeline', function (req, res) {
    timelineModel.find({}, function (err, logs) {
        if (err) {
            console.log("Error: " + err);
        } else {
            console.log("Data: " + JSON.stringify(logs))
        }
        res.send(JSON.stringify(logs));
    })
})


app.get('/timeline/getAllEvents', function (req, res) {
    timelineModel.find({}, function (err, data) {
        if (err) {
            console.log("Error: " + err);
        } else {
            console.log("Data: " + data);
        }
        res.send(data)
    });
})

app.put('/timeline/insert', function (req, res) {
    console.log(req.body)
    timelineModel.create({
        'eventDescription': req.body.eventDescription,
        'time': req.body.time,
        'hits': req.body.hits
    }, function (err, data) {
        if (err) {
            console.log("Error: " + err)
        } else {
            console.log("Data " + data);
        }
        res.send("Successfully inserted.");
    });
})

app.get('/timeline/delete/:id', function (req, res) {
    timelineModel.remove ({
        '_id': req.params.id
    }, function (err, data) {
        if (err) {
            console.log("Error: " + err);
        } else {
            console.log("Data: " + data);
        }
        res.send("Successfully deleted.")
    })
})

app.get('timeline/increaseHits/:id', function (req, res) {
    timelineModel.updateOne({
        '_id': req.params.id
    }, {
        $inc: {'hits': 1}
    }, function (err, data) {
        if (err) {
            console.log("Error: " + err);
        } else {
            console.log("Data: " + data);
        }
        res.send("Successfully Updated.")
    })
})
app.get('/search', function (req, res) {
    res.sendFile(__dirname + '/public/html/search.html')
})

app.use(express.static("./public"))