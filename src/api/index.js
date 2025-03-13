import express from "express";
import heroSettingsRoutes from "./heroSettings.js";
import usersRoutes from "./users.js";
import authRoutes from "./auth.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/settings/hero", heroSettingsRoutes);

export default router;
