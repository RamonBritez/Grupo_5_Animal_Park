const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    const token = jwt.sign({ userId: user.id}, "secreto", {expiresIn: "1h"});
    return token;
}

module.exports ={
    generateToken
}