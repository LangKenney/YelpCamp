//npm install express ejs body-parser mongoose --save

var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");
    
    //Requiring Routes
    
    var commentRoutes = require("./routes/comments"),
        campgroundRoutes = require("./routes/campgrounds"),
        indexRoutes = require("./routes/index");
    
//If you didnt shut down Mogo correctly
//   mongod --repair<br><br>
//   if that doesnt work --repairpath <path>
mongoose.connect("mongodb://localhost/yelp_camp_v8");
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static(__dirname  +"/public"));

//seed the database 
//seedDB(); 


//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This is the secret phrase",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds", campgroundRoutes);
//====Routes===

//======================

//Renders a page (lost) for any unreconized page (needs to be at the end)
//app.get('/*',function(req, res){
//    res.render('lost');
//});

//Allows the server to listen for requests
app.listen(process.env.PORT,process.env.IP,function(){
    console.log('Running the YelpCamp server...');
});

//on Rapberry pi server
//app.listen(3000,function(){