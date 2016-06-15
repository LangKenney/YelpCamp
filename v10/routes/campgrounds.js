//======================Campgroud routes======================
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");


//Renders the campgrounds page (Called campgrounds)
router.get('/', function(req, res) {
    //console.log(req.user)
        //get all campgrounds from DB and render file
        Campground.find({},function(err,allCampgrounds){
            if(err){
                console.log(err);
            } else {
                res.render("campgrounds/index",
                {campgrounds:allCampgrounds, currentUser:req.user});
            }
        });
        //res.render('campgrounds',{campgrounds:campgrounds})
});

//Addes a campground to the campgrounds page from the form
router.post('/', isLoggedIn, function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name:name, image:image, description:desc, author: author};
    // create a new campground and save to DB
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campground page
            //console.log(newlyCreated);
            res.redirect('/campgrounds');
        }
    });
});

//Renders the page with a form for a new campground entry
router.get('/new', isLoggedIn, function(req,res){
    res.render('campgrounds/new');
});

//Renders more info about a campground when one clicks it (needs to be after new, and before *)
router.get('/:id',function(req,res){
    //Find the campground with the provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render the show template with that campground
            res.render('campgrounds/show',{campground: foundCampground});   
        }
    });
});

//Edit campground
router.get("/:id/edit", checkCampgroundOwnerShip, function(req, res) {
        Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
                res.render("campgrounds/edit", {campground: foundCampground});
        }
        });
});

//Update campground
router.put("/:id", checkCampgroundOwnerShip, function(req, res){
    //find and update correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            //redirect back to show page
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//Delete a campground
router.delete("/:id", checkCampgroundOwnerShip, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundOwnerShip(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = router;