import { createResource } from "solid-js"
import { OperatingProcedure, OsReport, Service } from "../models/Section"
import createStardogQuery from "./createStardogQuery"

const fetchProcedures = async (sectionId: string): Promise<OperatingProcedure[]> => {
  const query = createStardogQuery(`
    SELECT *
      FROM <https://fse.ontology/>
      WHERE {
        ?id a fse:services;
          fse:hasProcedure ?procedure .
        FILTER(?id = <${sectionId}>)
    } 
  `)
  const res = (await query.execute()).results.bindings
  let procedures: OperatingProcedure[] = []
  for (const elem of res) {
    procedures.push({ name: elem["procedure"].value })
  }  
  return procedures
}

const fetchServices = async (documentId: string): Promise<Service[]> => {
  const query = createStardogQuery(`
    SELECT *
      FROM <https://fse.ontology/>
      WHERE {
        ?id a fse:outpatientSpecialistReport;
            fse:hasSection ?sect.
            ?sect a fse:services;
                fse:body ?body;
                fse:title ?title .
        FILTER(?id = <${documentId}>)
    } 
  `)
  const res = (await query.execute()).results.bindings
  let services: Service[] = []
  for (const elem of res) {
    services.push({
      body: elem["body"].value,
      title: elem["title"].value,
      procedures: await fetchProcedures(elem["sect"].value)
    })
  }  
  return services
}

const fetchOsReport = async (documentId: string): Promise<OsReport> => {
  const query = createStardogQuery(`
    SELECT *
      FROM <https://fse.ontology/>
      WHERE {
        ?id a fse:outpatientSpecialistReport;
            fse:hasSection [
                a fse:osReport;
                fse:body ?body;
                fse:title ?title;
            ]
        FILTER(?id = <${documentId}>)
    } 
  `)
  const res = (await query.execute()).results.bindings
  let osReport: OsReport = null
  for (const elem of res) {
    osReport = {
      body: elem["body"].value,
      title: elem["title"].value
    }
  }  
  return osReport
}


const useRsaStore = (documentId: string) => {
  const [osReport] = createResource<OsReport>(() => fetchOsReport(documentId))
  const [services] = createResource<Service[]>(() => fetchServices(documentId))

  return { osReport, services }
}

export default useRsaStore