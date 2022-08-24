export const isAuthorized = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/");
  }
};

export function isNotAuthorized(req, res, next) {
  if (req.user) {
    res.redirect("/dashboard");
  } else {
    next();
  }
}
