const router = require('express').Router();
const { posts, user, comments } = require('../models');
const sequelize = require('.././config/connection');

router.get('/', async (req, res) => {
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
      const post = dbPostData.map(posts => posts.get({ plain: true }));
      res.render('homepage', { post, loggedIn: req.session.loggedIn });
    }catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
});

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return; 
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/post/:id', async (req, res) => {
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
        return;}
      const post = dbPostData.get({ plain: true });
      res.render('postview', { post, loggedIn: req.session.loggedIn});

    }catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
});

module.exports = router; 