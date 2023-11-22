import Jwt from "jsonwebtoken";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
// authenticate;
export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Authentication failed - missing token",
    });
  }
  const tokenWithoutBearer = token.split(" ")[1];
  //verify the token
  Jwt.verify(tokenWithoutBearer, JWT_SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        message: "Authentication failed - invalid token",
      });
    }
    // attach the decoded token to the request object
    req.decoded = decoded;

    //continue the request
    next();
  });
};
//
