const express = require("express");
const router = express.Router();
const apiRoutes = require('./api');
const homeRoutes = require("./home");
const exerciseRoutes = require("./exercise");
const statsRoutes = require("./stats");

router.use('/api', apiRoutes);
router.use("/", homeRoutes);
router.use("/exercise", exerciseRoutes);
router.use("/stats", statsRoutes);

module.exports = router;