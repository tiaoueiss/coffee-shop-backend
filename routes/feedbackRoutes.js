const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController.js");

router.post("/", feedbackController.createFeedback);
router.get("/", feedbackController.getAllFeedbacks);
router.get("/customer/:customerName", feedbackController.getFeedbackByCustomer);
router.get("/:id", feedbackController.getFeedbackById);
router.put("/:id", feedbackController.updateFeedback);
router.delete("/:id", feedbackController.deleteFeedback);

module.exports = router;