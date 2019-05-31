const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");

// the done function in the cb function in passport.use passes the value of currentUser to be used here
passport.serializeUser((user, done) => {
    // this user.id is the ._id that is assigned in MongoDB
    // null is error handling
    done(null, user.id); //id is passed along here and we stuff it into a cookie and sent to browser
});

passport.deserializeUser((id, done) => {
    // sending out user id in cookie sent back from browser
    User.findById(id).then((user) => {
        done(null, user); 
    })
    
});

passport.use(
    new GoogleStrategy({
        // options for the google strategy
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        // passport callback function
        // check if user alrady exists in our database
        User.findOne({
            googleId: profile.id
        }).then((currentUser) => {
            if(currentUser){
                console.log("user is: " + currentUser);
                done(null, currentUser);
            } else {
                // if not create user in our db
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile._json.picture
                }).save().then((newUser) => {
                    console.log("new user created: " + newUser);
                    done(null, newUser);
                });
            }
        })
    })
)