const path = require("path")
const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")
const express = require("express")
const hbs = require("hbs")

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Dip",
  })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Dip",
  })
})

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Dip",
  })
})

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please add an address for response",
    })
  }
  geocode(req.query.address, (error, {
    latitude,
    longitude,
    location
  } = {}) => {
    if (error) {
      return res.send({error})
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send(error)
      }

      res.send({
        address: req.query.address,
        location,
        forecast: forecastData
      })
    })
  })
})

app.get("/product", (req, res) => {
  console.log(req.query)
  res.send({
    product: [],
  })
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Dip",
    errorMessage: "Help article not found.",
  })
})

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Dip",
    errorMessage: "Page not found.",
  })
})

app.listen(port, () => {
  console.log("Server is up on port "+port+".")
})