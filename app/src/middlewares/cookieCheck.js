module.exports = (req, res, next) =>{
    if(req.cookies.userAnimalPark){
        req.session.user = req.cookies.userAnimalPark;
        res.locals.user = req.session.user;
    }
    next();
}