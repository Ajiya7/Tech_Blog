const router = require('express').Router();
const { posts, user, comments } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('.././config/connection');

router.get('/', withAuth, async (req, res) => {
    try {
        const dbPostData = await posts.findAll({
            where: {
                user_id: req.session.user_id
              },
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
      const post = dbPostData.map(posts => posts.get({ plain: true }));
      res.render('dashboard', { post, loggedIn: true });

    }catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
});

router.get('/edit/:id', withAuth, async (req, res) => {
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
                model: user,
                attributes: ['username']
            }
        ]
    })

      const post = dbPostData.get({ plain: true });
      res.render('updatepost', { post, loggedIn: req.session.loggedIn});

    }catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
});

router.get('/newpost', (req, res) => {
    res.render('newpost');
});

  module.exports = router;