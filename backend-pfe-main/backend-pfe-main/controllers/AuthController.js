const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const PasswordResetToken = require("../models/PasswordResetToken");
const Notification = require("../models/Notification");

const CODE_EXPIRE_MINUTES = 15;

const normalizeEmail = (email) => String(email || "").trim().toLowerCase();
const escapeRegex = (value) =>
  String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const generateCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const sendResetCodeEmail = async (toEmail, code) => {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass) {
    throw new Error(
      "Configuration SMTP manquante (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)."
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: smtpFrom,
      to: toEmail,
      subject: "Code de reinitialisation du mot de passe",
      text:
        "Bonjour,\n\n" +
        "Votre code de reinitialisation est: " +
        code +
        "\n\n" +
        "Ce code expire dans " +
        CODE_EXPIRE_MINUTES +
        " minutes.\n",
    });
  } catch (error) {
    if (
      error?.responseCode === 535 ||
      String(error?.message || "").includes("BadCredentials")
    ) {
      throw new Error(
        "Identifiants SMTP invalides. Pour Gmail, utilisez SMTP_USER et un mot de passe d'application (App Password)."
      );
    }
    throw error;
  }
};

module.exports = {
  forgotPassword: async (req, res) => {
    const { email } = req.body;
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail) {
      return res.status(400).json({ success: false, message: "Email requis." });
    }

    try {
      const user = await User.findOne({
        email: {
          $regex: new RegExp("^" + escapeRegex(normalizedEmail) + "$", "i"),
        },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur introuvable pour cet email.",
        });
      }

      const code = generateCode();
      const expiresAt = new Date(Date.now() + CODE_EXPIRE_MINUTES * 60 * 1000);

      await PasswordResetToken.updateMany(
        { email: normalizedEmail, used: false },
        { $set: { used: true } }
      );

      await PasswordResetToken.create({
        email: normalizedEmail,
        code,
        expiresAt,
        used: false,
      });

      await sendResetCodeEmail(normalizedEmail, code);

      await Notification.create({
        title: "Reinitialisation mot de passe",
        message: "Demande recue pour : " + normalizedEmail,
        type: "warning",
        isRead: false,
        createdAt: Date.now(),
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Erreur lors de la demande de reinitialisation.",
      });
    }
  },

  verifyResetCode: async (req, res) => {
    const { email, code } = req.body;
    const normalizedEmail = normalizeEmail(email);
    const normalizedCode = String(code || "").trim();

    if (!normalizedEmail || !normalizedCode) {
      return res.status(400).json({
        success: false,
        message: "Email et code sont requis.",
      });
    }

    try {
      const tokenDoc = await PasswordResetToken.findOne({
        email: normalizedEmail,
        code: normalizedCode,
        used: false,
        expiresAt: { $gt: new Date() },
      }).sort({ createdAt: -1 });

      if (!tokenDoc) {
        return res.status(400).json({
          success: false,
          message: "Code invalide, deja utilise, ou expire.",
        });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Erreur lors de la verification du code.",
      });
    }
  },

  resetPassword: async (req, res) => {
    const { email, code, newPassword } = req.body;
    const normalizedEmail = normalizeEmail(email);
    const normalizedCode = String(code || "").trim();

    if (!normalizedEmail || !normalizedCode || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Tous les champs sont requis." });
    }

    try {
      const tokenDoc = await PasswordResetToken.findOne({
        email: normalizedEmail,
        code: normalizedCode,
        used: false,
        expiresAt: { $gt: new Date() },
      }).sort({ createdAt: -1 });

      if (!tokenDoc) {
        return res.status(400).json({
          success: false,
          message: "Code invalide, deja utilise, ou expire.",
        });
      }

      const user = await User.findOne({
        email: {
          $regex: new RegExp("^" + escapeRegex(normalizedEmail) + "$", "i"),
        },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Utilisateur introuvable.",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);

      await User.findByIdAndUpdate(
        { _id: user._id },
        { password: hash },
        { new: true }
      );

      await PasswordResetToken.findByIdAndUpdate(
        { _id: tokenDoc._id },
        { used: true },
        { new: true }
      );

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Erreur lors de la reinitialisation.",
      });
    }
  },
};
