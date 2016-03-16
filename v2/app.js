var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose')

//If you didnt shut down Mogo correctly
//   mongod --repair<br><br>
//   if that doesnt work --repairpath <path>

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

var campgrounds = [
    {name:'Bear Pass', image:'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg'},
    {name:'Small Lake', image:'https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg'},
    {name:'Family Lodge', image:'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'},
    {name:'Bear Pass', image:'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg'},
    {name:'Small Lake', image:'https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg'},
    {name:'Family Lodge', image:'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'},
    {name:'Bear Pass', image:'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg'},
    {name:'Small Lake', image:'https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg'},
    {name:'Family Lodge', image:'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'},
    {name:'Bear Pass', image:'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg'},
    {name:'Small Lake', image:'https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg'},
    {name:'Family Lodge', image:'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'},
    {name:'Bear Pass', image:'https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg'},
    {name:'Small Lake', image:'https://farm1.staticflickr.com/22/31733208_3190a1e982.jpg'},
    {name:'Family Lodge', image:'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'}
    ]

app.get('/',function (req,res) {
    res.render('landing');
})

app.get('/campgrounds',function(req, res) {

        res.render('campgrounds',{campgrounds:campgrounds})
});


app.post('/campgrounds',function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name,image:image};
    campgrounds.push(newCampground);
    //redirect back to campground page
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new',function(req,res){
    res.render('new');
});

app.get('/*',function(req, res){
    res.render('lost');
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log('Running the YelpCamp server...');
});