import { Observation } from "./OperatingProcedure"
import { ImmunizationCard, Section } from "./Section"
import { SubstanceAdministration } from "./SubstanceAdministration"

interface ClinicalDocument {
  id: string
  documentType: string
  createdAt: string
  version: number
  languageCode: string
  realmCode: string
  confidentialityCode: string
  body: string
  humanAuthor?: string
  deviceAuthor?: string
  organization?: string
  signatory?: string
  signTime?: string
  code?: LOINC_code
  sections?: Section[]
  inFulfillmentOf?: string
}

interface LOINC_code {
  value: Code
  description?: string
}

enum Code {
  Exemption  = "57827-8",
  FirstAid   = "59258-4",
  Discharge  = "34105-7",
  Immunization   = "87273-9",
  LaboratoryMedicine   = "11502-2",
  OutpatientSpecialist = "11488-4",
  P_Admission   = "57830-2",
  P_Pharma = "57833-6",
  P_Specialist = "57833-6",
  P_TransportRequest = "57834-4",
  Radiology = "68604-8",
  SummaryHealthProfile = "60591-5"
}

// Immunization
interface Immunization {
  sections: ImmunizationCard[]
}

// Prescription
interface Prescription extends ClinicalDocument {
  priority: string
}

interface Pharma extends Prescription {
  consumables?: string[]
}

interface Specialist extends Prescription {
  diagnosis?: string
}

interface Admission extends Prescription {}

interface TransportRequest extends Prescription {}

export { ClinicalDocument, LOINC_code, Code, Pharma, Prescription, Specialist }