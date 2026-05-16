import { Request, Response } from "express";
import Lead from "../models/Lead";

export const createLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead = await Lead.create(req.body);

    res.status(201).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to create lead",
    });
  }
};

export const getLeads = async (
  req: Request,
  res: Response
) => {
  try {
    const leads = await Lead.find();

    res.status(200).json({
      success: true,
      data: leads,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
    });
  }
};

export const updateLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead =
      await Lead.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to update lead",
    });
  }
};

export const deleteLead = async (
  req: Request,
  res: Response
) => {
  try {
    await Lead.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Lead deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete lead",
    });
  }
};