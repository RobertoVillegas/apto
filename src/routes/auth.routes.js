import { Router } from "express";
import passport from "passport";
import { isAuthorized, isNotAuthorized } from "../utils/auth";

const router = Router();

router.get("/login", isNotAuthorized, (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/auth/profile",
    failureRedirect: "/auth/login",
    passReqToCallback: true,
  })
);

router.get("/signup", isNotAuthorized, (req, res) => {
  res.render("signup");
});

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/auth/profile",
    failureRedirect: "/auth/signup",
    passReqToCallback: true,
  })
);

router.get("/profile", isAuthorized, (req, res) => {
  res.render("profile");
});

router.get("/logout", isAuthorized, (req, res, next) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
  });

  res.redirect("/");
});

export default router;
