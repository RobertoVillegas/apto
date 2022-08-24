import express from "express";
import { create } from "express-handlebars";
import flash from "connect-flash";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import passport from "passport";
import path from "path";
import session from "express-session";
import bodyParser from "body-parser";

import authRoutes from "./routes/auth.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import indexRoutes from "./routes/index.routes";

import { SECRET, MONGODB_URI } from "./config";

// Initializatio
const app = express();
import "./db";
import "./strategies/local-auth";

// settings
app.set("views", path.join(__dirname, "views"));

const exphbs = create({
  extname: ".hbs",
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
  defaultLayout: "main",
});

app.engine(".hbs", exphbs.engine);
app.set("view engine", ".hbs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: SECRET,
    name: "local-auth",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: MONGODB_URI,
    }),
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
  })
);
app.use(flash());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use((req, res, next) => {
  app.locals.user = req.user;
  app.locals.email = req.user ? req.user.email : null;
  app.locals.loginMessage = req.flash("loginMessage");
  app.locals.signupMessage = req.flash("signupMessage");
  next();
});

// routes
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);

app.use((req, res, next) => {
  res.status(404).render("404");
});

export default app;
