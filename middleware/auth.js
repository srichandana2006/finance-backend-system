const checkRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.headers.role;

    if (!roles.includes(userRole)) {
      return res.status(403).send("Access Denied");
    }

    next();
  };
};

module.exports = checkRole;