const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
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
  // do your magic!
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
  // do your magic!
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
  // do your magic!
}

module.exports = router;
