// Importing: Express, `burger.js`
// Creating the router for the app, and exporting the `router` at the end.

var express = require("express");
var router = express.Router();

var burger = require("../models/burger.js");

//set up all routes here
router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res) {
    burger.create(["burger_name"], 
    [req.body.burger_name],
    function(result) {
        res.json({ id: result.insertId});
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("Condition", condition);
    if (req.body.devoured === "false") {
        req.body.devoured = 0;
    } 
    if (req.body.devoured === "true") {
        req.body.devoured = 1;
    }
    burger.update({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changeRows ==0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});





module.exports= router;