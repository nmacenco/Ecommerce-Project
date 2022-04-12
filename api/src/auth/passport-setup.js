const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const sequelize = require("sequelize");
dotenv.config();

passport.serializeUser(function (user, done) {
  /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
   console.log('user: ',user);
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  /*
    Instead of user this function usually receives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
   console.log("user: ", user);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      passReqToCallback: true,
      proxy: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      const { given_name, family_name, email } = profile;
      let name = given_name ? given_name.split(" ")[0] : '';
      let surname = family_name? family_name.split(" ")[0]: '';
      let isActive = true;
      let role = "user";
      let CountryId = 1;
      let signedInWithGoogle = true;
      let [user, created] = await User.findOrCreate({
        where: {
          name,
          surname,
          email,
          isActive,
          role,
          CountryId,
          signedInWithGoogle,
        },
      });

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      let userTokens = user.tokens;
      userTokens.push(token);
      await User.update(
        {
          tokens: userTokens,
        },
        {
          where: {
            id: user.id,
          },
        }
      );
      return done(null, user);
    }
  )
);
