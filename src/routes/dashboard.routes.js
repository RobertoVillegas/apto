import { Router } from "express";
import { isAuthorized } from "../utils/auth";
const router = Router();

router.get("/", isAuthorized, (req, res) => {
  res.render("dashboard");
});

export default router;
