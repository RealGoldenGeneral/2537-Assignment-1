const express = require('express')
const app = express()
app.set('view engine', 'ejs');

app.listen(5000, function (err) {
    if (err)
        console.log(err)
})

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/html/index.html')
})

app.use(express.static("./public"))