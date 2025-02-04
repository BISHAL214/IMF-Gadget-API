import { prisma } from "../utils/prisma.js";
import {
  generateCodename,
  generateConfirmationCode,
} from "../utils/generateCodename.js";

export const getAllGadgets = async (req, res) => {
  try {
    const { status } = req.query;
    const gadgets = await prisma.gadget.findMany({
      where: status ? { status } : {},
    });
    const result = gadgets.map((gadget) => ({
      ...gadget,
      missionSuccessProbability: `${Math.floor(Math.random() * 100) + 1}%`,
    }));
    if (!result) return res.status(404).json({ message: "No gadgets found" });
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export const addGadget = async (req, res) => {
  try {
    const { name, status } = req.body;
    if (!name)
      return res.status(400).json({ message: "Gadget name is required" });
    const gadget = await prisma.gadget.create({
      data: { name, codename: generateCodename(), status },
    });
    res.status(201).json(gadget);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export const updateGadget = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Gadget ID is required" });
    const data = req.body;
    if (!data)
      return res.status(400).json({ message: "Request body is required" });
    await prisma.gadget.update({ where: { id }, data });
    res.json({ message: `Gadget ID ${id} updated successfully` });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export const deleteGadget = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Gadget ID is required" });
    const date = new Date();
    await prisma.gadget.update({
      where: { id },
      data: { status: "Decommissioned", decommissionedAt: date },
    });
    res.json({
      message: `Gadget ID ${id} Decommissioned successfully`,
      decommissionedAt: date,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};

export const selfDestruct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Gadget ID is required" });
    const code = generateConfirmationCode();
    res.json({
      message: `Self-destruct initiated for gadget ID ${id}`,
      confirmationCode: code,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Internal Server Error!" });
  }
};
