module.exports = {
  isAdmin: (req, res, next) => {
    if (req.session.user && req.session.user.rol === "ADMIN") {
      next();
    } else {
      if (!req.session.user) {
        return res.redirect("/users/login");
      } else {
        return res.redirect("/");
      }
    }
  },

  isLogged: (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect("/users/login");
    }
  },

  isVisitor: (req, res, next) => {
    if (!req.session.user) {
      next();
    } else {
      res.redirect("/users/edit/" + req.session.user.id);
    }
  },
};
