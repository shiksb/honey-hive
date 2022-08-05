//Import the mongoose module
var mongoose = require('mongoose');
var fs = require('fs');

var mongoDB = 'mongodb://localhost:27017/users';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// main landing page
server.get("/", (request, response) => {
    response.render("landing", { 
    });
});

// users view
server.get("/users", (request, response) => {    
    var files;
    fs.readdir("uploads", (err, files) => {
        files = files;
    });
    db.collection("user").find({}).toArray().then(function(result) {
        response.render("users", {
            users: result.map(user => JSON.stringify(user)),
            files: files
        });
    });

});

server.post("/submit", (request, response) => {

    db.collection('user').insertOne({
        name: request.body.name,
        email: request.body.email,
        phone: request.body.phone,
        description: request.body.description
    }, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        // db.collection("user").find({}).toArray().then(function(result) {
        //     console.log(result);
        // });
    });

    if (request.files.file) {
        let file = request.files.file;
        
        // move photo to uploads directory
        file.mv('./uploads/' + file.name);

        console.log('Uploaded file');
    } else {
        console.log('No file uploaded.');
    }

    response.redirect("/users");

    // uncomment to go to thank you page
    // response.render("index", {
    //     description: "Thank you!",
    // });
});

server.get("/delete", (request, response) => {
    db.collection("user").deleteMany({}, function(err, obj) {
        if (err) throw err;
        console.log("users deleted");
    });
    response.redirect("/users");
});