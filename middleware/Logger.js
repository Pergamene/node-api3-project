class Logger {

  /**
   * logs to the console the following information about each request:
   *    request method
   *    request url
   *    a timestamp
   * 
   * runs on every request made to the api.
   */
  logger(req, res, next) {
    console.log(`Request method: ${req.method}\nRequest URL: ${req.url}\nTimestamp: ${req.timestamp}`);

    next();
  }
}

export default new Logger();
