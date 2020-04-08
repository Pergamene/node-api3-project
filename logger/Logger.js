/**
 * logs to the console the following information about each request:
 *    request method
 *    request url
 *    a timestamp
 * 
 * runs on every request made to the api.
 */
function logger(req, res, next) {
  console.log(`\n=== LOG ===\nRequest method: ${req.method}\nRequest URL: ${req.originalUrl}\nTimestamp: ${new Date()}\n`);

  next();
}

module.exports = logger;
