import * as express from "express";
import { stockController } from "../controllers/stock.controller";

const router = express.Router();

// Routes for user
router.get("/stock", stockController.getStockData);

module.exports = router;
