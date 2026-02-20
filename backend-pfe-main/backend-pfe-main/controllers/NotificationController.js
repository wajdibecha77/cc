const Notification = require("../models/Notification");

module.exports = {
  getAllNotifications: async (req, res) => {
    try {
      const notifications = await Notification.find({})
        .sort({ createdAt: -1 })
        .limit(100);

      return res.status(200).json({
        message: "notifications found",
        data: notifications,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "error from server",
      });
    }
  },

  getNotificationById: async (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({
        message: "notification id is required",
      });
    }

    try {
      const notification = await Notification.findById(req.params.id);

      if (!notification) {
        return res.status(404).json({
          message: "notification not found",
          data: null,
        });
      }

      return res.status(200).json({
        message: "notification found",
        data: notification,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "error from server",
      });
    }
  },

  markAsRead: async (req, res) => {
    if (!req.params.id) {
      return res.status(400).json({
        message: "notification id is required",
      });
    }

    try {
      const notification = await Notification.findByIdAndUpdate(
        req.params.id,
        { isRead: true },
        { new: true }
      );

      if (!notification) {
        return res.status(404).json({
          message: "notification not found",
          data: null,
        });
      }

      return res.status(200).json({
        message: "notification marked as read",
        data: notification,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "error from server",
      });
    }
  },
};
