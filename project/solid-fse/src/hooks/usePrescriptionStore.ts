import { createResource } from "solid-js"
import { ClinicalDocument, Pharma, Prescription, Specialist } from "../models/ClinicalDocument"
import createStardogQuery from "./createStardogQuery"

const fetchPrescription = async (document: ClinicalDocument): Promise<Prescription> => {
  const query = createStardogQuery(`
    SELECT ?priority
      FROM <https://fse.ontology/>
      WHERE {
        ?id a fse:prescription ;
            fse:hasPriority ?priority;
        FILTER(?id = <${document.id}>)
      } 
  `)
  const res = (await query.execute()).results.bindings
  const prescription = document as Prescription
  prescription.priority = res[0]["priority"].value
  return prescription
}

const fetchPharmaDoc = async (document: ClinicalDocument): Promise<Pharma> => {
  const pharma = await fetchPrescription(document) as Pharma
  pharma.consumables = await fetchPharmaConsumables(document.id)
  return pharma
}

const fetchPharmaConsumables = async (documentId: string): Promise<string[]> => {
  const query = createStardogQuery(`
    SELECT ?consumable
      FROM <https://fse.ontology/>
      WHERE {
        ?id a fse:pharma ;
            fse:consumable ?consumable;
        FILTER(?id = <${documentId}>)
      } 
  `)
  const res = (await query.execute()).results.bindings
  const consumables = []
  for (const elem of res) {
    consumables.push(elem["consumable"].value)
  }  
  return consumables
}

const fetchSpecialistDoc = async (document: ClinicalDocument): Promise<Specialist> => {
  const specialist = await fetchPrescription(document) as Specialist
  specialist.diagnosis = await fetchSpecialistDiagnosis(document.id)
  return specialist
}

const fetchSpecialistDiagnosis = async (documentId: string): Promise<string> => {
  const query = createStardogQuery(`
    SELECT ?diagnosis
      FROM <https://fse.ontology/>
      WHERE {
        ?id a fse:specialist ;
            fse:hasDiagnosis ?diagnosis;
        FILTER(?id = <${documentId}>)
      } 
  `)
  const res = (await query.execute()).results.bindings
  return res.length > 0 && res[0]["diagnosis"] ? res[0]["diagnosis"].value : null
}

const usePrescriptionStore = (prescription: ClinicalDocument) => {
  const [pharmaDoc] = createResource<Pharma>(() => fetchPharmaDoc(prescription))
  const [prescriptionDoc] = createResource<Prescription>(() => fetchPrescription(prescription))
  const [specialistDoc] = createResource<Specialist>(() => fetchSpecialistDoc(prescription))
  return { pharmaDoc, prescriptionDoc, specialistDoc }
}

export default usePrescriptionStore