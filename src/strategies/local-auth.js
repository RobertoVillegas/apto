import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import User from "../models/User";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await User.findOne({ email: email });

      if (user) {
        return done(
          null,
          false,
          req.flash("signupMessage", "The email is already taken.")
        );
      } else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        done(null, newUser);
      }
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false, req.flash("loginMessage", "User not found."));
      }

      if (!user.validatePassword(password)) {
        return done(
          null,
          false,
          req.flash("loginMessage", "Invalid password.")
        );
      }

      return done(null, user);
    }
  )
);
