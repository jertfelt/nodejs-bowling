const express = require("express");
const { append } = require("express/lib/response");
//funktion av express: 
const expressApp = express();
//members- schema:
const Members = require('./models/members');


//*------------mongoDB databas, connecta och lyssna på 3000-localservern för requests
const mongoose = require ("mongoose");
const dbURI = "mongodb+srv://test:test@bowling.fjtiu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(dbURI, {useNewUrlParser: true})
.then(result => expressApp.listen(3000))
.catch(error => console.log(error));

//*-----------middleware och statiska filer
//1. access till css & bilder
expressApp.use(express.static("public"));
//2. för form data 
expressApp.use(express.urlencoded({extended: true}))
//3. formula för next och response/requests så programmet inte bara fastnar på första funktionen
expressApp.use((request, response, next) =>{
  response.locals.path = request.path;
  next();
})

//*-------view engine <3
expressApp.set("view engine", "ejs");

 //*-----------------------routes

//--------startsida:
expressApp.get("/", (request, response) => {
  response.render("index", {title: "Bowling Fyrishov"});
})

//----medlemmar:
expressApp.get("/medlemmar", (request, response) => {
  // response.render("./members/members", {title: "Våra medlemmar"})
  Members.find().sort({ createdAt: -1 }) //från nyast till äldst
  .then(result => {
    response.render('./members/members', { members: result, title: "Våra medlemmar" });
  })
  .catch(error => {
    console.log(error);
  });
})

expressApp.get("/medlemmar/bli-medlem", (request, response) => {
  response.render("./members/create", {title: "Bli medlem"})
})

expressApp.post("/medlemmar", (request, response) => {
  // console.log(request.body) tack vare url.encoded lägnre upp
  //nytt objekt utifrån request.body
  const medlem = new Members(request.body);
  console.log(medlem)
  medlem.save().then(()=> {
    response.redirect("/medlemmar");
  })
  .catch((error)=>{
    console.log(error)
  })
})

expressApp.get("/medlemmar/:id", (request, response) => {
  const id = request.params.id;
  // console.log(id)
  Members.findById(id).then(result => {
    response.render("./members/onemember", {
      member: result, title: "Medlemsinfo"
    })
  }).catch(error => {
    console.log(error)
  })
})

//delete medlem
expressApp.delete("/medlemmar/:id", (request, response) => {
  const id = request.params.id;
  Members.findByIdAndDelete(id).then(result => {
    
    response.json({ redirect: "/medlemmar"})
    console.log("deleted")
  }).catch(error => {
    console.log(error)
  })
})



//!404 
expressApp.use((request, response) => {
  response.status(404).render("404", {title: "Error"});
});