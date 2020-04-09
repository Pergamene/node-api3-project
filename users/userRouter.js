const express = require('express');

const db = require('./userDb');
const postDb = require('../posts/postDb');

const router = express.Router();

router.use('/:id', validateUserId);

router.post('/', validateUser, (req, res) => {
  db.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(() => {
      res.status(500).json({ error: 'There was a problem adding the user.' });
    });
});

router.post('/:id/posts', validatePost, (req, res) => {
  postDb.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(() => {
      res.status(500).json({ error: 'There was a problem adding the post.' });
    });
});

router.get('/', (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({ error: 'There was a problem getting the users.' });
    });
});

router.get('/:id', (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(500).json({ error: 'There was a problem getting the specified user.' });
  }
});

router.get('/:id/posts', (req, res) => {
  db.getUserPosts(req.user.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ error: 'There was a problem getting the specified users posts.' });
    });
});

router.delete('/:id', (req, res) => {
  db.remove(req.user.id) 
    .then(count => {
      if (count) {
        res.status(200).json(req.user);
      } else {
        res.status(500).json({ error: 'There was a problem deleting the user.' });
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'There was a problem deleting the user.' });
    });
});

router.put('/:id', (req, res) => {
  const id = req.user.id;
  db.update(id, req.body)
    .then(count => {
      if (count) {
        db.getById(id)
          .then(user => {
            res.status(200).json(user);
          })
          .catch(() => {
            res.status(500).json({ error: 'There was an error getting the updated user.' });
          });
      } else {
        res.status(500).json({ error: 'There was an error updating the user.' });
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'There was an error updating the user.' });
    });
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
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: 'Invalid user id.' });
      }
    })
    .catch(() => {
      res.status(500).json({ error: 'There was a problem getting the user.'});
    });
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
  if (!Object.keys(body).length) {
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
  if (!Object.keys(body).length) {
    res.status(400).json({ message: 'missing post data' });
  } else if (!body.text) {
    res.status(400).json({ message: 'missing required text field' });
  }

  next();
}

module.exports = router;
