/*********************************************************************************
*  BTI425 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Adam Davis Student ID: 116953217 Date: 2023-01-17
*  Cyclic Link: 
*
********************************************************************************/ 

// Setup
const MoviesDB = require("./modules/moviesDB.js");
const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

const HTTP_PORT = process.env.PORT || 8080;
const db = new MoviesDB();

app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
    res.status(200).json({message: "API Listening"})
});

app.post("/api/movies", (req, res) => {
    db
        .addNewMovie(req.body)
        .then(movie => res.status(201).json(movie))
        .catch(error => res.status(500).json({error: error.toString()}));
});

app.get("/api/movies/:id", (req, res) => {
    db
        .getMovieById(req.params.id)
        .then(movie => res.status(200).json(movie))
        .catch(error => res.status(500).json({error: error.toString()}));
});

app.get("/api/movies", (req, res) => {    
    db
        .getAllMovies(req.query.page, req.query.perPage, req.query.title)
        .then(movie => res.status(200).json(movie))
        .catch(error => res.status(500).json({error: error.toString()}));
});

app.put("/api/movies/:id", (req, res) => {
    db
        .updateMovieById(req.body, req.params.id)
        .then(movie => res.status(200).json(movie))
        .catch(error => res.status(500).json({error: error.toString()}));
});

app.delete("/api/movies/:id", (req, res) => {
    db
        .deleteMovieById(req.params.id)
        .then(_ => res.status(204).end())
        .catch(error => res.status(500).json({error: error.toString()}));
});

db
    .initialize(process.env.MONGODB_CONN_STRING)
    .then(_ => {
        app.listen(HTTP_PORT, _ => console.log("server listening on: ", HTTP_PORT));
    })
    .catch(error => console.log("unable to start server: ", error));