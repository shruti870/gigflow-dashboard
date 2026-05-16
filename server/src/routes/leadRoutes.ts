import express from "express";

import {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
} from "../controllers/leadController";

import protect from "../middleware/authMiddleware";

const router = express.Router();

/*
  CREATE LEAD
*/
router.post("/", protect, createLead);

/*
  GET LEADS
*/
router.get("/", protect, getLeads);

/*
  UPDATE LEAD
*/
router.put("/:id", protect, updateLead);

/*
  DELETE LEAD
*/
router.delete("/:id", protect, deleteLead);

export default router;