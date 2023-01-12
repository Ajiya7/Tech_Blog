const router = require("express").Router();
const { comments } = require("../../models");
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

router.get("/", async (req, res) => {
    try { 
        const dbCommentData  = await comments.findAll({})
    dbCommentData=> res.json(dbCommentData)
}catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

router.post("/",withAuth, async (req, res) => {
    if (req.session) {
    try {
        const dbCommentData  = await comments.create({
            comment: req.body.comment, 
            post_id: req.body.post_id,
            user_id: req.session.user_id,
      });
      dbCommentData=> res.json(dbCommentData)
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }});
  
  module.exports = router;