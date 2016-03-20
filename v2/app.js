//npm install express ejs body-parser mongoose --save

var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose')

//If you didnt shut down Mogo correctly
//   mongod --repair<br><br>
//   if that doesnt work --repairpath <path>
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model('Camground',campgroundSchema);
// Campground.create({
//     name:'Small Lake', 
//     image:'https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg'
//     }, function(err,campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
    
//     }
// );

// var campgrounds = [
//     {name:'Bear Pass', image:'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg'},
//     {name:'Small Lake', image:'https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg'},
//     {name:'Family Lodge', image:'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'},
//     {name:'Bear Pass', image:'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg'},
//     {name:'Small Lake', image:'https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg'},
//     {name:'Family Lodge', image:'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'},
//     {name:'Bear Pass', image:'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg'},
//     {name:'Small Lake', image:'https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg'},
//     {name:'Family Lodge', image:'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'},
//     {name:'Bear Pass', image:'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg'},
//     {name:'Small Lake', image:'https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg'},
//     {name:'Family Lodge', image:'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'},
//     {name:'Bear Pass', image:'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg'},
//     {name:'Small Lake', image:'https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg'},
//     {name:'Family Lodge', image:'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'}
//     ]

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
                res.render("campgrounds",{campgrounds:allCampgrounds});
            }
        });
        //res.render('campgrounds',{campgrounds:campgrounds})
});

//Addes a campground to the campgrounds page from the form
app.post('/campgrounds',function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name,image:image};
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
    res.render('new');
});

//Renders a page (lost) for any unreconized page
app.get('/*',function(req, res){
    res.render('lost');
});

//Allows the server to listen for requests
app.listen(process.env.PORT,process.env.IP,function(){
    console.log('Running the YelpCamp server...');
});

//on Rapberry pi server
//app.listen(3000,function(){