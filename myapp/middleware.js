import { AccessToken } from "./db.js";

const authenticate = async (req, res, next) => {
  const tokenId = req.headers.authorization; 

  if (!tokenId) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const accessToken = await AccessToken.findByPk(tokenId);
  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }

  const now = new Date();
  const tokenExpiration = new Date(accessToken.createdAt);
  tokenExpiration.setSeconds(tokenExpiration.getSeconds() + accessToken.ttl);

  if (now > tokenExpiration) {
    return res.status(401).json({ error: "Unauthorized: Token expired" });
  }

  req.userId = accessToken.userId;
  next();
};

export default authenticate;
