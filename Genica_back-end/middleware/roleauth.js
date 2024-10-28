const checkRole = (roles) => (req, res, next) => {
    const role = req.user.role;
  
    if (roles.includes(role)) {
      next();
    } else {
      res.status(403).send('Access Denied');
    }
  };
  
  export default checkRole;
  