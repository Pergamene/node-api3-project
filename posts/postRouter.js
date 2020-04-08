const express = require('express');

const db = require('./postDb');

const router = express.Router();

router.use('/:id', validatePostId);

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

/**
 * validates the post id on every request that expects a post id parameter
 * 
 * if the `id` parameter is valid:
 *    store that post object as `req.post`
 * 
 * if the `id` parameter does not match any post id in the database:
 *    cancel request
 *    status 400
 *    return { message: 'invalid post id' }
 */
function validatePostId(req, res, next) {
  db.getById(req.params.id)
    .then(post => {
      if (post.length) {
        req.post = post;
      } else {
        res.status(400).json({ message: 'invalid post id' });
      }
    })

  next();
}

module.exports = router;
