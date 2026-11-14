export const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!req.user || !req.user.role) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: "Insufficient permissions." });
    }

    next();
  };
};