import { Router } from "express";
import ReDoc from "redoc-express";

const router = Router();

router.get(
  "/redoc",
  ReDoc({
    title: "",
    specUrl: "/openapi.json",
  })
);

export default router;
