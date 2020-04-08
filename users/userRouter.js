const express = require('express');

const db = require('./userDb');

const router = express.Router();

router.use('/:id', validateUserId);

router.post('/', validateUser, (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

/**
 * validates the user id on every request that expects a user id parameter
 * 
 * if the `id` parameter is valid:
 *    store that user object as `req.user`
 * 
 * if the `id` parameter does not match any user id in the database:
 *    cancel request
 *    status 400
 *    return { message: 'invalid user id' }
 */
function validateUserId(req, res, next) {
  db.getById(req.params.id)
    .then(user => {
      if (user.length) {
        req.user(user);
      } else {
        res.status(400).json({ message: 'invalid user id' });
      }
    })

  next();
}

/**
 * validates the `body` on a request to create a new user
 * 
 * if the `body` is missing:
 *    cancel request
 *    status 400
 *    return { message: 'missing user data' }
 * 
 * if the `body` is missing the required `name` field:
 *    cancel request
 *    status 400
 *    return { message: 'missing required name field' }
 */
function validateUser(req, res, next) {
  const body = req.body;
  if (!body) {
    res.status(400).json({ message: 'missing user data' });
  } else if (!body.name) {
    res.status(400).json({ message: 'missing required name field' });
  }

  next();
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
 */
function validatePost(req, res, next) {
  const body = req.body;
  if (!body) {
    res.status(400).json({ message: 'missing post data' });
  } else if (!body.text) {
    res.status(400).json({ message: 'missing required text field' });
  }

  next();
}

module.exports = router;
