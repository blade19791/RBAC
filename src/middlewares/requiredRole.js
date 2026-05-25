export const requiredRole = (role) => {
  return (req, res, next) => {
    if (req.user.role === "admin") return next();
    if (req.user.role !== role) return res.status(403).send("Forbidden");
    next();
  };
};
