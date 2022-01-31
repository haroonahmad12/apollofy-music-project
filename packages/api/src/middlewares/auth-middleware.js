const { auth, logger } = require("../services");
const { auth: mockAuth } = require("../services/__mocks__");

async function authMiddleware(req, res, next) {
  try {
    const bearerToken = await auth.getAuthToken(req.headers);
    const userClaims =
      process.env.NODE_ENV === "test"
        ? await mockAuth.verifyIdToken(bearerToken)
        : await auth.verifyIdToken(bearerToken);

    auth.login(req, userClaims);

    next();
  } catch (error) {
    logger.debug(error.message);

    res.status(401).send({
      data: null,
      error: "Unauthorized",
    });
  }
}

module.exports = {
  authMiddleware: authMiddleware,
};
