import User from "./user.model";
import Patient from "./patient.model";
import Doctor from "./doctor.model";
import { Appointment } from "./appointment.model";

export function setupAssociations() {
  User.hasOne(Patient, { foreignKey: "user_id", as: "patient" });
  Patient.belongsTo(User, { foreignKey: "user_id", as: "user" });

  User.hasOne(Doctor, { foreignKey: "user_id", as: "doctor" });
  Doctor.belongsTo(User, { foreignKey: "user_id", as: "user" });

  Doctor.hasMany(Appointment, { foreignKey: "doctor_id", as: "appointments" });
  Appointment.belongsTo(Doctor, { foreignKey: "doctor_id", as: "doctor" });

  Patient.hasMany(Appointment, {
    foreignKey: "patient_id",
    as: "appointments",
  });
  Appointment.belongsTo(Patient, { foreignKey: "patient_id", as: "patient" });

  console.log("✅ Model associations configured successfully");
}

export { User, Patient, Doctor, Appointment };
