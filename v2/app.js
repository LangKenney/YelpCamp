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
    image: String,
    description: String
});

var Campground = mongoose.model('Campground',campgroundSchema);

// Campground.create({
//     name:'Small Lake', 
//     image:'https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg',
//     description:'This is a small but beautiful lake campground. Get your reservation early as it fills up. No bathrooms!'
    
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
                res.render("index",{campgrounds:allCampgrounds});
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
    res.render('new');
});

//Renders more info about a campground when one clicks it (needs to be after new, and before *)
app.get('/campgrounds/:id',function(req,res){
    //Find the campground with the provided ID
    Campground.findById(req.params.id ,function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render the show template with that campground
            res.render('show',{campground: foundCampground});   
        }
    });
});

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