const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var bodyParser = require('body-parser') 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var cors = require('cors')
app.use(cors())
app.listen(port, () => console.log(`Listening on port ${port}`));

var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/mydb";
var url = "mongodb://localhost:27017/dataBase";

 //check init
 MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("dataBase");
  dbo.collection("users").findOne({}, function(err, result) {
    if (result===null) {
       initData()
    }
    else
    db.close();
  });
});

//Server services
app.post('/api/login', (req, res) => {
 console.log(req.body);
 MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  // console.log(dbo.collection("users"))
    var dbo = db.db("dataBase");
    dbo.collection("users").findOne({email:req.body.email}, function(err, result) {
    if (err) throw err;
    if(result.password===req.body.password)
        res.send({status:"OK",token:result.login_token})
    else
        res.send({status:"fail",token:result.login_token})
    }
)
  })
});

app.get('/api/getFruits', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
      var dbo = db.db("dataBase");
      dbo.collection("users").findOne({login_token:req.headers.login_token}, function(err, result) {
        
        if (result){
          console.log(result.fruits[0].nutrition[0])
          res.send({fruits: result.fruits})
        }
        else{
          console.log(" NO USER WITH FUKING ")
        }
      })
    })
  });

 app.post('/api/fruit/:id/updateNutrition', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("dataBase");
    console.log(req.headers.login_token)
    var myquery = {login_token:req.headers.login_token,
                    fruits:{$elemMatch:{name:req.body.fruitName}}};
    var newvalues = { $set: {"fruits.$.nutrition":req.body.nutritions} };
    dbo.collection("users").updateOne(myquery,newvalues, function(err, result) {
      if (err) throw err;
      console.log("1 document updated");
      res.send({nutritions:req.body.nutritions})
      db.close();
    });
  });
 })


///
/// PRAGMA MARK - Server Database initilization hack
/// 




//init
function initData(){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
  });
  //create collection
  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("dataBase");
      dbo.createCollection("users", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
      });
    });
  //insert
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("dataBase");
    var myobj = createFirstUser();
    dbo.collection("users").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("dataBase");
    var myobj = createSecUser();
    dbo.collection("users").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
  }
function createFirstUser(){
  return {
    login_token: "ofir",
    email:"ofir@abc.com",
    password:"1234",
    fruits:[{
      id:1,
      name: "Red Apple",
      image:"https://img.huffingtonpost.com/asset/5b7ad435200000420034abec.jpeg?cache=epfSt9odEb&ops=scalefit_720_noupscale",
      thumbnail: "www.google.com/wow",
      wiki_link: "https://en.wikipedia.org/wiki/Apple",
      overview:[
        {title:"origin", value: "North Carloine"},
        {title:"genues", value:"WTF"},
        {title:"yaer of development",value: "WTF"}
      ],
      nutrition: [ {title: "calories", value: 123},
      {title: "sugar", value: "30g"},
      {title: "fiber", value:"4.9g"},
      {title: "protein", value: "0.6g"}]
    },
    {
      id:1,
      name: "Banana",
      image:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/1200px-Banana-Single.jpg",
      thumbnail: "www.google.com/wow",
      wiki_link: "https://en.wikipedia.org/wiki/Banana",
      overview:[
        {title:"origin", value: "North Carloine"},
        {title:"genues", value:"uniqe"},
        {title:"yaer of development",value: "2018"}
      ],
      nutrition: [ {title: "calories", value: 123},
      {title: "sugar", value: "30g"},
      {title: "fiber", value:"4.9g"},
      {title: "protein", value: "0.6g"}]
    },
    {
      id:1,
      name: "Water Melon",
      image:"https://freshpointlocal.co.uk/wp-content/uploads/2018/12/WaterMelon-1.jpg",
      thumbnail: "www.google.com/wow",
      wiki_link: "https://en.wikipedia.org/wiki/Melon",
      overview:[
        {title:"origin", value: "North Carloine"},
        {title:"genues", value:"uniqe"},
        {title:"yaer of development",value: "100"}
      ],
      nutrition: [ {title: "calories", value: 123},
      {title: "sugar", value: "30g"},
      {title: "fiber", value:"4.9g"},
      {title: "protein", value: "0.6g"}]
    }
    
  ]
  }
} 

function createSecUser(){
  return {
    login_token: "tene",
    email:"tene@abc.com",
    password:"1234",
    fruits:[{
      id:1,
      name: "Red Apple",
      image:"https://img.huffingtonpost.com/asset/5b7ad435200000420034abec.jpeg?cache=epfSt9odEb&ops=scalefit_720_noupscale",
      thumbnail: "www.google.com/wow",
      wiki_link: "https://en.wikipedia.org/wiki/Apple",
      overview:[
        {title:"origin", value: "North Carloine"},
        {title:"genues", value:"WTF"},
        {title:"yaer of development",value: "WTF"}
      ],
      nutrition: [ {title: "calories", value: 123},
      {title: "sugar", value: "30g"},
      {title: "fiber", value:"4.9g"},
      {title: "protein", value: "0.6g"}]
    },
    {
      id:1,
      name: "Banana",
      image:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/1200px-Banana-Single.jpg",
      thumbnail: "www.google.com/wow",
      wiki_link: "https://en.wikipedia.org/wiki/Banana",
      overview:[
        {title:"origin", value: "North Carloine"},
        {title:"genues", value:"uniqe"},
        {title:"yaer of development",value: "2018"}
      ],
      nutrition: [ {title: "calories", value: 123},
      {title: "sugar", value: "30g"},
      {title: "fiber", value:"4.9g"},
      {title: "protein", value: "0.6g"}]
    },
    {
      id:1,
      name: "Water Melon",
      image:"https://freshpointlocal.co.uk/wp-content/uploads/2018/12/WaterMelon-1.jpg",
      thumbnail: "www.google.com/wow",
      wiki_link: "https://en.wikipedia.org/wiki/Melon",
      overview:[
        {title:"origin", value: "North Carloine"},
        {title:"genues", value:"uniqe"},
        {title:"yaer of development",value: "100"}
      ],
      nutrition: [ {title: "calories", value: 123},
      {title: "sugar", value: "30g"},
      {title: "fiber", value:"4.9g"},
      {title: "protein", value: "0.6g"}]
    }
    
  ]
  }
} 
