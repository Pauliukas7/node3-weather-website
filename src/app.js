const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const e = require("express");

const app = express();

//Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
//setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Paul",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Paul",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Some helpful content",
    title: "Help page",
    name: "Paul",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address term",
    });
  }

  geocode(req.query.address, (err, data) => {
    if (err) return res.send({ error: err });

    const placeName = data.location.split(" ")[0];
    forecast(placeName, (err, forecastData) => {
      if (err) return res.send({ error: err.info });

      res.send({
        location: data.location,
        forecast: forecastData,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term",
    });
  } else {
    console.log(req.query.search);
    res.send({
      products: [],
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    errorText: "Help article not found",
    name: "Paul",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    errorText: "Page not found",
    name: "Paul",
  });
});

app.listen(3000, () => {
  console.log("Server running");
});
