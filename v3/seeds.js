var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {name: "Clouds Rest",
     image: "http://www.mountainguides.com/photos/everest-south/bc-heli-landing2_aj.jpg",
     description: "Your home in the clouds"
    },
    
    {name: "Desert Oasis",
     image: "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s320x320/e15/11282263_959782430719590_1098327015_n.jpg",
     description: "A desert oasis with large pools"
    },
    
    {name: "Forest run",
     image: "http://www.carabs.com/images/album/picts_07_07_on/070831_006-dar-state-forest.jpg",
     description: "A great shady retreat in the forest next to the river"
    },
    
    ]

function seedDB(){
    //Remove campgrounds
    Campground.remove({},function(err){
            if(err){
                console.log(err);
        } else {
            console.log("Campgrounds removed!");
        }
    });
    
    //Create Campgrounds
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err)
            } else {
                console.log("Created Campground");
                //create a comment
                Comment.create(
                    {
                        text: "This was an amazing campground",
                        author:"Tommy"
                    },function(err, comment){
                        if(err){
                            console.log;    
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment")
                        }
                    });
            }
        });
    });
    
    
};

module.exports = seedDB;