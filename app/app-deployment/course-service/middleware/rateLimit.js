const rateLimit = require("express-rate-limit");

const recommendationsLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: {
    message: "Too many requests, please try again after a minute",
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: rateLimit.ipKeyGenerator,
});

module.exports = recommendationsLimiter;
