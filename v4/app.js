//npm install express ejs body-parser mongoose --save

var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds")
    
//If you didnt shut down Mogo correctly
//   mongod --repair<br><br>
//   if that doesnt work --repairpath <path>
mongoose.connect("mongodb://localhost/yelp_camp_v4");
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

seedDB(); 

//Renders the main page (called landing)
app.get('/',function (req,res) {
    res.render('landing');
})

//Renders the campgrounds page (Called campgrounds)
app.get('/campgrounds',function(req, res) {
        //get all campgrounds from DB and render file
        Campground.find({},function(err,allCampgrounds){
            if(err){
                console.log(err);
            } else {
                res.render("campgrounds/index",{campgrounds:allCampgrounds});
            }
        });
        //res.render('campgrounds',{campgrounds:campgrounds})
});

//Addes a campground to the campgrounds page from the form
app.post('/campgrounds',function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name, image:image, description:desc};
    // create a new campground and save to DB
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campground page
            res.redirect('/campgrounds');
        }
    });
});

//Renders the page with a form for a new campground entry
app.get('/campgrounds/new',function(req,res){
    res.render('campgrounds/new');
});

//Renders more info about a campground when one clicks it (needs to be after new, and before *)
app.get('/campgrounds/:id',function(req,res){
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


//======================Comment routes======================
app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground:campground});
        }
    })
    
});

app.post("/campgrounds/:id/comments", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
});
//======================

//Renders a page (lost) for any unreconized page (needs to be at the end)
app.get('/*',function(req, res){
    res.render('lost');
});

//Allows the server to listen for requests
app.listen(process.env.PORT,process.env.IP,function(){
    console.log('Running the YelpCamp server...');
});

//on Rapberry pi server
//app.listen(3000,function(){