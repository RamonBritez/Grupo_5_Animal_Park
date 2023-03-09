module.exports = (req, res, next) => {
    if (req.session.user && req.session.user.rol === "ADMIN") {
        next()
    } else {
        if (!req.session.user) {
            res.redirect("/users/login")
        } else {
            res.redirect("/users/edit/" + req.session.user.id)
        }
    }
}