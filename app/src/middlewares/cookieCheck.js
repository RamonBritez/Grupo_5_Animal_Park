module.exports = (req, res, next) =>{
    if(req.cookies.userAnimalPark){
        req.session.user = req.cookies.userAnimalPark;
        res.locals.user = req.session.user;
    }
    
  
   /* if(req.cookie.AnimalPark != undefined && req.session.user == undefined ){
    
      
        let user = users.find(user => user.email === req.cookie.AnimalPark);

        return req.session.user = user
    }*/

    next();
}