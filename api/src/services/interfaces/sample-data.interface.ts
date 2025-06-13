import { Patient } from "../../models/patient.model";

export interface ISampleDataService {
  createSampleAppointmentsForPatient(patient: Patient): void;
}
