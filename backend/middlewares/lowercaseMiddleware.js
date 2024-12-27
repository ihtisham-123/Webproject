const lowercaseMiddleware = (req, res, next) => {
    if (req.body.platform) {
      req.body.platform = req.body.platform.toLowerCase();
    }
    next();
  };
  
  module.exports = lowercaseMiddleware;