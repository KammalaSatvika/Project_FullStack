
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
var serviceAccount = require("./serviceAccountKey.json");

initializeApp({
    credential: cert(serviceAccount)
  });
  
const db = getFirestore();




var express = require('express');
var app = express();
app.get('/Home', function (req, res) {
  res.sendFile(__dirname+"/home.html");
})
app.get('/signup.html', function (req, res) {
  res.sendFile(__dirname+"/signup.html");
})

app.get('/login.html', function (req, res) {
  res.sendFile(__dirname+"/login.html");
})


app.get("/signupSubmit", function(req, res){
  res.sendFile(__dirname+"/diary.html");
  console.log("First Name: " + req.query.fname);
  console.log("Last Name: " + req.query.lname);
  console.log("Phone Number: " + req.query.pnum);
  console.log("Email: " + req.query.email);
  console.log("Password: " + req.query.password);
  db.collection("Signup").add({
      FirstName: req.query.fname,
      LastName: req.query.lname,
      Email: req.query.email,
      PhoneNumber: req.query.pnum,
      Password: req.query.password,

  })

})

app.get("/loginSubmit", function(req, res){
  console.log("Email: " + req.query.email);
  console.log("Password: " + req.query.password);
  db.collection("Login").add({
      Email: req.query.email,
      Password: req.query.password,

  })

})

app.get("/diarySubmit", function(req, res){
  res.sendFile(__dirname+"/diary.html");
  console.log("Email: " + req.query.email);
  console.log("Password: " + req.query.password);
  db.collection("Login").add({
      Title: req.query.entry-title,
      DiaryEntry: req.query.dairy-entry,

  })

})

app.listen(3000, function(){
  console.log("Server is running on 3000.");
})