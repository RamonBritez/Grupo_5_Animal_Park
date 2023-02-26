const fs = require('fs');
const path = require('path');


const adminDB = path.join(__dirname, '../database/usersDB.json');

const users = JSON.parse(fs.readFileSync(adminDB, 'utf-8'));

module.exports ={
    index: (req, res) => {
    
        res.render("users/admin", {
           users
        })
    }
}


