module.exports = (req, res, next) =>{
    if(req.cookies.userArtistaDali){
        req.session.user = req.cookies.userArtistaDali;
        res.locals.user = req.session.user;
    }
    next();
}