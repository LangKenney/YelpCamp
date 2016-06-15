//======================Authorization routes======================
//======================As well other routes======================
var express = require("express");
var router = express.Router();
var passport = require("passport");
var Campground = require("../models/campground");
var User = require("../models/user");
//var Campground = require("../models/campground");
//var Comment = require("..models/comment");

//Renders the main page (called landing)
router.get('',function (req,res) {
    //res.render('landing');
    res.redirect("/campgrounds");
})

//======================
//AUTHORIZATION ROUTES
router.get("/register", function(req, res) {
    res.render("register");
});

//handles sign up
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

//login form
router.get("/login", function(req, res) {
    res.render("login")
});

//handling login logic
router.post("/login", passport.authenticate("local" ,
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

//logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
})

//middle wear
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
//============End Auth routes ==============


module.exports = router;