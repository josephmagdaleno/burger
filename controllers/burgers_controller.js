var express = require("express");

var router = express.Router();

var burgers = require("../models/burger.js");

//routes

//main index
router.get("/", function(req,res){
	burgers.selectAll(function(data){
		var hbsObject = {
			burgers: data
		};
		console.log(hbsObject);
		res.render("index", hbsObject);
	});
});
// create a new burger
router.post("/api/burgers", function(req,res){
	burgers.insertOne(["burger_name","devoured"],[req.body.burger_name, false], function(result){
				res.redirect("/");
				console.log("POST");
			});
});
//eat a burger
router.put("/api/update/:id", function(req,res){
	var condition = "id = " + req.params.id;
	//console.log("condition", condition);
	burgers.updateOne({
		devoured: true
	}, condition, function(result){
		res.redirect("/")
	});
});

router.get("/api", function(req,res){
	burgers.selectAll(function(data){
		res.json(data);
	})
})

module.exports = router;