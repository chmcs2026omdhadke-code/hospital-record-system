import express from "express";
import {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient
} from "../controllers/patientController.js";

const router = express.Router();

// GET all patients
router.get("/", getPatients);

// CREATE new patient
router.post("/", createPatient);

// UPDATE patient
router.put("/:id", updatePatient);

// DELETE patient
router.delete("/:id", deletePatient);

export default router;