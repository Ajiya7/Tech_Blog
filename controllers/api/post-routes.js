const router = require("express").Router();
const { user, posts, comments } = require("../../models");
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

router.get("/", async (req, res) => {
    try { 
        const dbPostData = await posts.findAll({
            attributes: [
                'id',
                'content',
                'title'
            ],
            include: [
              {
                model: user,
                attributes: ['username']
          }
        ]
    })
    dbPostData => res.json(dbPostData)
}catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

router.get("/:id", async (req, res) => {
    try { 
        const dbPostData = await posts.findOne({
            where: {
                id: req.params.id
              },
            attributes: [
                'id',
                'content',
                'title'
            ],
            include: [
                {
                    model: comments,
                    attributes: ['id', 'comment', 'post_id', 'user_id'],
                    include: {
                      model: user,
                      attributes: ['username']
                    }
                },
              {
                model: user,
                attributes: ['username']
          }
        ]
    })
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        dbPostData => res.json(dbPostData)
}catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

router.post("/",withAuth, async (req, res) => {
    try {
      const dbPostData = await posts.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
      });
      dbPostData => res.json(dbPostData)
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  router.put("/:id",withAuth, async (req, res) => {
    try {
      const dbPostData = await posts.update({
        title: req.body.title,
       content: req.body.content
      },
      {where: {
        id: req.params.id
      }
      });
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
    }
    res.json(dbPostData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.delete("/:id",withAuth, async (req, res) => {
    try {
      const dbPostData = await posts.destroy({
        where: {
        id: req.params.id
      }
      });
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
    }
    res.json(dbPostData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  module.exports = router;