const express = require('express');

const db = require('./postDb');

const router = express.Router();

router.use('/:id', validatePostId);

router.get('/', (req, res) => {
  db.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ error: 'There was a problem getting the posts.' });
    });
});

router.get('/:id', (req, res) => {
  if (req.post) {
    res.status(200).json(req.post);
  } else {
    res.status(500).json({ error: 'There was a problem getting the post with the specified id.' });
  }
});

router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      if (count) {
        res.status(200).json(req.post);
      } else {
        res.status(500).json({ error: 'There was a problem deleting the post.' });
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'There was a problem deleting the post.' });
    });
});

router.put('/:id', validatePost, (req, res) => {
  const id = req.params.id;
  db.update(id, req.body)
    .then(count => {
      if (count) {
        db.getById(id)
          .then(post => {
            res.status(200).json(post);
          })
          .catch(() => {
            res.status(500).json({ error: 'There was a problem getting the updated post.' });
          })
      } else {
        res.status(500).json({ error: 'There was a problem updating the post.' });
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'There was a problem updating the post.' });
    });
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
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(400).json({ message: 'invalid post id' });
      }
    })
}

/**
 * validates the `body` on a request to create a new post
 * 
 * if the `body` is missing:
 *    cancel request
 *    status 400
 *    return { message: 'missing post data' }
 * 
 * if the `body` is missing the required `text` field:
 *    cancel request
 *    status 400
 *    return { message: 'missing required text field' }
 * 
 * if the `body` is missing the required `user_id` field:
 *    cancel request
 *    status 400
 *    return { message: 'missing required user id' }
 */
function validatePost(req, res, next) {
  const body = req.body;
  if (!Object.keys(body).length) {
    res.status(400).json({ message: 'missing post data' });
  } else if (!body.text) {
    res.status(400).json({ message: 'missing post text field' });
  } else if (!body.user_id) {
    res.status(400).json({ message: 'missing post user id field'});
  } else {
    next();
  }
}

module.exports = router;
