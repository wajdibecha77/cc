const { useColors } = require("debug/src/browser");
const { MongoClient, ObjectID } = require("mongodb");
const Intervention = require("../models/intervention");
const User = require("../models/User");
const Notification = require("../models/Notification");

module.exports = {
  addIntervention: async (req, res) => {
    const { name, delai, description, lieu, degree, createdBy } = req.body;

    if (!name || !delai || !description || !lieu || !degree || !createdBy) {
      return res.status(400).json({
        message: "all fields is required!",
      });
    }

    try {
      const newIntervention = new Intervention({
        name: name,

        delai: delai,
        description: description,
        lieu: lieu,
        degree: degree,
        createdBy: createdBy,
      });
      const savedIntervention = await newIntervention.save();

      const creator = await User.findById(createdBy).populate("service");
      if (creator && creator.role === "EMPLOYEE") {
        const employeeName = creator?.name || "Employe inconnu";
        const concernedTarget =
          (creator?.service && creator.service.name) ||
          description ||
          "Non specifie";
        const interventionDateTime = savedIntervention.createdAt || new Date();

        await Notification.create({
          category: "INTERVENTION_DECLARED",
          title: "Nouvelle declaration d'intervention",
          message:
            employeeName +
            " a declare une intervention de type " +
            name +
            " au lieu " +
            lieu +
            ".",
          type: "warning",
          isRead: false,
          interventionId: savedIntervention._id,
          metadata: {
            interventionType: name,
            employeeName,
            concernedTarget,
            interventionDateTime,
            lieu,
          },
        });
      }

      return res.status(200).json({
        message: "Intervention added!",
        data: savedIntervention,
      });
    } catch (err) {
      return res.status(500).json({
        message: err,
      });
    }
  },

  allInterventions: async (req, res) => {
    try {
      const interventions = await Intervention.find()
        .populate("createdBy")
        .populate("affectedBy")
        .sort({ createdAt: -1 });

      return res.status(200).json(interventions);
    } catch (err) {
      return res.status(500).json({
        message: err.message || "error from server",
      });
    }
  },

  getInterventionById: async (req, res) => {
    if (!req.params.id) {
      res.status(400).json({
        status: 400,
        message: "Intervention ID is required in params!",
      });
    }
    try {
      const inter = await Intervention.findById({ _id: req.params.id });

      let createdby = await User.findById({ _id: inter.createdBy });
      let affected = null;
      if (inter.affectedBy) {
        affected = await User.findById({ _id: inter.affectedBy });
      }
      console.log("inter", inter.affectedToUsers[0]);
      if (inter.affectedToUsers && inter.affectedToUsers.length > 0) {
        let result = await Promise.all(
          inter.affectedToUsers.map(async (id) => {
            let user = await User.findById({ _id: id.toString() });
            return user;
          })
        );

        res.status(200).json({
          name: inter.name,
          _id: inter._id,
          createdBy: createdby,
          degree: inter.degree,
          etat: inter.etat,
          delai: inter.delai,
          dateDebut: inter.dateDebut,
          dateEnd: inter.dateEnd || null,
          affectedBy: affected || null,
          description: inter.description,
          lieu: inter.lieu,
          affectedToUsers: result,
        });
      }

      res.status(200).json({
        name: inter.name,
        _id: inter._id,
        createdBy: createdby,
        degree: inter.degree,
        etat: inter.etat,
        dateDebut: inter.dateDebut,
        dateEnd: inter.dateEnd || null,
        delai: inter.delai,
        affectedBy: affected || null,
        description: inter.description,
        lieu: inter.lieu,
        affectedToUsers: null,
      });
    } catch (err) {
      res.status(400).json({
        message: err,
      });
    }
  },

  deleteIntervention: async (req, res) => {
    if (req.params.id) {
      let id = req.params.id;
      try {
        await Intervention.findByIdAndDelete({ _id: id });
        res.status(200).json({
          message: "Intervention deleted successfully",
        });
      } catch (err) {
        res.status(500).json({
          message: "Error collection!",
        });
      }
    } else {
      res.status(400).json({
        message: "ID is required!",
      });
    }
  },

  updateIntervention: async (req, res) => {
    const { affectedBy } = req.body;
    if (req.params.id && !req.body.fermer && !req.body.etat) {
      try {
        const inter = await Intervention.findById({ _id: req.params.id });
        await Intervention.findByIdAndUpdate(
          { _id: req.params.id },
          {
            affectedBy: affectedBy,
            affectedToUsers: inter.affectedToUsers && inter.affectedToUsers.length > 0 ? [...inter.affectedToUsers, affectedBy] : [affectedBy],
            dateDebut: Date.now(),
            etat: "EN_COURS",
          }
        );
        res.status(200).json({
          message: "Intervention affected to tech successfully",
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "error from server",
        });
      }
    } else if (req.body.fermer && !req.body.etat) {
      try {
        await Intervention.findByIdAndUpdate(
          { _id: req.params.id },
          {
            dateDebut: null,
            etat: "NON_AFFECTEE",
            affectedBy: null,
          }
        );
        res.status(200).json({
          message: "Intervention updated successfully",
        });
      } catch (err) {
        res.status(500).json({
          message: "error from server",
        });
      }
    } else if (req.body.etat) {
      try {
        await Intervention.findByIdAndUpdate(
          { _id: req.params.id },
          {
            dateEnd: Date.now(),
            etat: req.body.etat,
          }
        );
        res.status(200).json({
          message: "Intervention updated successfully",
        });
      } catch (err) {
        res.status(500).json({
          message: "error from server",
        });
      }
    }
  },
};
