const router = require("express").Router();

// created middleware to execute when visiting route below
const authCheck = (req, res, next) => {
    if(!req.user){
        // if user is not logged in
        res.redirect("/auth/login");
    } else {
        // if logged in
        next();
    }
}

// this is for all profile routes
//this will be if someone searches just with /profile
router.get("/", authCheck, (req, res) => {
    res.render("profile", {user: req.user})
}); 

module.exports = router;