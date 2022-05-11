const Members = require('../models/members');

const member_index = (request, response) => {
  //från nyaste medlemmen till äldst, sorterat
  Members.find().sort({ createdAt: -1 })
    .then(result => {
      response.render('members', { members: result, title: "Alla medlemmar" });
    })
    .catch(error => {
      console.log(error);
    });
}

//individuell medlem:
const member_single = (request, response) => {
  const id = request.params.id;
  Members.findById(id)
    .then(result => {
      response.render('member', { member: result, title: "Medlemsinfo" });
    })
    .catch(error => {
      console.log(error);
      response.render('404', { title: 'Medlem finns inte :(' });
    });
}

//visa skapa medlem-sida

const member_create_get = (request, response) => {
  response.render('create', { title: 'Registrera ny användare' });
}

//skapa medlem
const member_create_post = (request, response) => {
  const memberList = new Members(request.body);
  memberList.save()
    .then(result => {
      res.redirect('/members');
    })
    .catch(error => {
      console.log(error);
    });
}

//funktion för att ta bort specifik medlem
const member_delete = (request, response) => {
  const id = request.params.id;
  Members.findByIdAndDelete(id)
    .then(result => {
      //när man tagit bort vill man ju komma och kolla på alla medlemmar igen:
      response.json({ redirect: '/members' });
    })
    .catch(error => {
      console.log(error);
    });
}

//exporterar 
module.exports = {
  member_index,
  member_create_get,
  member_create_post,
  member_single,
  member_delete
}