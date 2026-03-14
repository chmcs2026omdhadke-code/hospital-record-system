import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
    trim: true,
  },

  age: {
    type: Number,
    required: true,
    min: [0, "Age cannot be negative"],
    max: [150, "Age seems invalid"],
  },

  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },

  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits"],
  },

  disease: {
    type: String,
    required: true,
  },

  doctorAssigned: {
    type: String,
    required: true,
  },

  admissionDate: {
    type: Date,
    required: true,
    default: Date.now,
  },

  status: {
    type: String,
    required: true,
    enum: ["Admitted", "Discharged"],
    default: "Admitted",
  },
},
{ timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;