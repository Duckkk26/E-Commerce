import express from 'express';
import { router as vnpayRouter } from './vnpay.js';
var router = express.Router();
router.use('/vnpay', vnpayRouter);
export { router };