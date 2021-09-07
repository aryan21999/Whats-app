const express = require('express')
// const userRouter = require('./routers/user')
const path = require('path')

const app = express();
const port = process.env.port || 3000


app.use(express.static(__dirname + '././public'));
const publicDirectoryPath = path.join(__dirname, '/views/')

app.set("view engine", "ejs");

app.get('/', function (req, res, next) {
  res.render(`${publicDirectoryPath}signin`)
})

app.get('/index', function (req, res, next) {
  res.render(`${publicDirectoryPath}index`)
})

app.get('/signup', function (req, res, next) {
  res.render(`${publicDirectoryPath}signup`)
})

app.get('/forget', function (req, res, next) {
    res.render(`${publicDirectoryPath}forget`)
  })

app.get('/addContact', function (req, res, next) {
    res.render(`${publicDirectoryPath}addContact`)
  })

app.use(express.static(publicDirectoryPath))


app.use(express.json())
app.use(express.static("public"));

// app.use(userRouter)


app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
})