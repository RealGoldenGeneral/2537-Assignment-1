const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyparser = require("body-parser")
app.set('view engine', 'ejs');

app.listen(process.env.PORT || 5000, function (err) {
    if (err)
        console.log(err)
})

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/html/index.html')
})
const https = require('https');

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

mongoose.connect("mongodb+srv://NickyCheng:s4P6M6uqC57FSNOh@cluster0.v0ltm.mongodb.net/timeline?retryWrites=true&w=majority", 
{useNewUrlParser: true, useUnifiedTopology: true });
const eventSchema = new mongoose.Schema({
    eventDescription: String,
    hits: Number,
    time: String
});
const userSchema = new mongoose.Schema({
    username: String,
    password: String
})
const timelineModel = mongoose.model("timeline", eventSchema);
const userModel = mongoose.model("users", userSchema);

app.use(bodyparser.urlencoded({
    extended: true
}));

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

app.get('/timeline/increaseHits/:id', function (req, res) {
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

app.use(bodyparser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}))

app.get('/history', function (req, res) {
    res.sendFile(__dirname + "/public/html/timeline.html")
})

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

app.get('/search', function (req, res) {
    res.sendFile(__dirname + '/public/html/search.html')
})

app.get('/login', function (req, res) {
    res.sendFile(__dirname + '/public/html/login.html')
})

app.get('/signup', function (req, res) {
    res.sendFile(__dirname + '/public/html/signup.html')
})

function get_password(data) {
    return data.password
}

app.post('/verify', function (req, res) {
    username = req.body.username
    password = req.body.password
    userModel.find({name: username}, function (err, user) {
        var info = user
        if (err) {
            console.log(err)
        } else {
            user = user.map(get_password)
            if (req.body.password == user[0]) {
                req.session.real_user = info
                req.session.authenticated = true
                res.send(req.session.real_user)
            } else {
                req.session.authenticated = false
                res.send("incorrect information")
            }
        }
    })
})

app.use(express.static("./public"))