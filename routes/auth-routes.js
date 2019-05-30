const router = require("express").Router();
const passport = require("passport");

// auth login
router.get("/login", (req, res) => { 
    res.render("login");
})

// auth logout
router.get("/logout", (req, res) => {
    // handle with passport
    res.send("logging out with google")
})

// auth with google
router.get("/google", passport.authenticate("google", {
    // what we want from user profile and goes into array
    scope: ["profile"]
}));

// callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.send("you reached the callback URI")
})

module.exports = router;