const express = require('express');
const memberController = require('../controllers/memberController');
const router = express.Router();

//alla medlemmar
router.get("/", memberController.member_index);

//skapa (lägger den överst så den inte bråkar med :id)
router.get("/create", memberController.member_create_get);
router.post("/", memberController.member_create_post);

//individuell
router.get("/:id", memberController.member_single);

//ta bort
router.get("/:id", memberController.member_delete);

//exportera modulen:
module.exports = router;