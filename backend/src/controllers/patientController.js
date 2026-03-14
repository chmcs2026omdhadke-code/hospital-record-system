import Patient from "../models/PatientModel.js";

// GET all patients
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.status(200).json(patients);
  } catch (error) {
    console.error("GET Patients Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ADD patient
export const createPatient = async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    console.error("CREATE Patient Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE patient
export const updatePatient = async (req, res) => {
  try {
    const updated = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    console.error("UPDATE Patient Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE patient
export const deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Patient deleted" });
  } catch (error) {
    console.error("DELETE Patient Error:", error);
    res.status(500).json({ message: error.message });
  }
};