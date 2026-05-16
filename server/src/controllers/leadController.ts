import { Request, Response } from "express";
import Lead from "../models/Lead";

/*
  CREATE LEAD
*/
export const createLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead = await Lead.create(req.body);

    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({
      message: "Error creating lead",
    });
  }
};

/*
  GET ALL LEADS
*/
export const getLeads = async (
  req: Request,
  res: Response
) => {
  try {
    const leads = await Lead.find().populate(
      "assignedTo",
      "name email"
    );

    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching leads",
    });
  }
};

/*
  UPDATE LEAD
*/
export const updateLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedLead);
  } catch (error) {
    res.status(500).json({
      message: "Error updating lead",
    });
  }
};

/*
  DELETE LEAD
*/
export const deleteLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    await lead.deleteOne();

    res.status(200).json({
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting lead",
    });
  }
};