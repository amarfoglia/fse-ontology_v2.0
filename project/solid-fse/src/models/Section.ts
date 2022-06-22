import { ClinicalDocument } from "./ClinicalDocument"
import { OperatingProcedure } from "./OperatingProcedure"
import { HealthWorker } from "./Person"
import { SubstanceAdministration } from "./SubstanceAdministration"

interface Section {
  title: string
  body?: string
  code?: string
  isPartOf?: ClinicalDocument
}

interface Immunizations extends Section {
  administrations: SubstanceAdministration[]
}

// PSS - Summary Health Profile
interface Alerts extends Section {
  start: string
  end: string
  allergy: string
}

interface HistoryOfDiseases extends Section {
  diseases: Disease[]
}

interface HistoryOfPregnancies extends Section {
  pregnancies: Pregnancy[]
}

interface Medications extends Section {
  therapies: Therapy[]
}

interface Pregnancy {
  result: string
  start: string
  end: string
}

interface Therapy {
  statusCode: string
  start: string
  end: string
  dailyQuantity: number
  administration: SubstanceAdministration
}

// RML - Medicine Laboratory Report
interface Specialty extends Section {
  test: Test
}

// RSA - Outpatient Specialist Report
interface Service extends Section {
  procedures: OperatingProcedure[]
}

interface OsReport extends Section {}

// VPS - First Aid Report
interface Triage extends Section {
  effectiveTime: string
  statusCode: string
  performer: HealthWorker
}

interface Observation {
  statusCode: string
  symptom: string
  body: string
  code: string
}

interface Discharge extends Section {
  effectiveTime: string
  statusCode: string
  performer: HealthWorker
  transfer: string // Organization
}

interface ModeOfTransport extends Section {
  vehicle: string
  missionManager: HealthWorker
}

interface ReasonForVisit extends Section {
  mainProblem: Observation
}

// VAC - Immunization
interface ImmunizationCard extends Section {
  administration: SubstanceAdministration
}

// DE - Discharge Letter
interface DsExemption extends Section {}

// P - Prescription
interface Prescriptions extends Section {}

// LDO - Hospital Discharge Letter
interface DischargeDiagnosis extends Section {}
interface ReasonForAdmission extends Section {}
interface Progression extends Section {}

// RAD - Radiology Report
interface RadReport extends Section {}
interface PerformedExam extends Section {}

interface Allergy {
  name: string
  description: string
}

interface Agent {
  name: string
  description: string
}

interface AdverseReaction {
  name: string
  description: string
}

interface Disease {
  name: string
}

interface Test {
  name: string
  method: string
  material: string
  result: string
  unit: string
  latestVersion?: string
}

export { 
  Section, OperatingProcedure, ImmunizationCard, Specialty, 
  Test, Alerts, HistoryOfDiseases, HistoryOfPregnancies, Medications, Therapy, Pregnancy, Disease,
  Triage, Discharge, ModeOfTransport, Observation, ReasonForVisit, Service, OsReport
}