import { Router } from "express";
import { isNotAuthorized } from "../utils/auth";
const router = Router();

router.get("/", isNotAuthorized, (req, res) => {
  res.render("index");
});

export default router;
