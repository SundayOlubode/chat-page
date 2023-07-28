const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.set("views", "views");
app.use(express.static("views"));

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/signin', (req, res) => {
    res.render('signin')
})

app.listen(5500, () => {
    console.log('server listening on 5500');
})