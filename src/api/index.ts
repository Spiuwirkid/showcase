import express from 'express';
import authRouter from './auth.js';
import usersRouter from './users.js';
import categoriesRouter from './categories.js';
import heroSettingsRoutes from "./heroSettings.js";
import templatesRouter from './templates.js';
import uploadRouter from './upload.js';

const router = express.Router();

// Daftarkan semua router API
router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/categories', categoriesRouter);
router.use("/settings/hero", heroSettingsRoutes);
router.use('/templates', templatesRouter);
router.use('/upload', uploadRouter);

export default router; 