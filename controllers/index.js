const express = require("express");
const router = express.Router();
const homeRoutes = require("./home");
const exerciseRoutes = require("./exercise");
const dashboardRoutes = require("./dashboard");

router.use("/", homeRoutes);
router.use("/exercise", exerciseRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;