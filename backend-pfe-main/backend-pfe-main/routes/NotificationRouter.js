const express = require("express");

const route = express.Router();

const NotificationController = require("../controllers/NotificationController");
const isauth = require("../middlewares/isauth");
const isadmin = require("../middlewares/isAdmin");

route.get("/all", isauth, isadmin, NotificationController.getAllNotifications);
route.get("/:id", isauth, isadmin, NotificationController.getNotificationById);
route.put("/:id/read", isauth, isadmin, NotificationController.markAsRead);

module.exports = route;
