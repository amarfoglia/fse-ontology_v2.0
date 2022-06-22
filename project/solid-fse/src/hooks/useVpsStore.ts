import { createResource } from "solid-js"
import { Discharge, ModeOfTransport, ReasonForVisit, Triage } from "../models/Section"
import createStardogQuery from "./createStardogQuery"

const fetchModeOfTransport = async (documentId: string): Promise<ModeOfTransport> => {
  const query = createStardogQuery(`
    SELECT *
      FROM <https://fse.ontology/>
      WHERE {
        ?id 
          a fse:firstAidReport ;
            fse:hasSection [
                a fse:modeOfTransport;
                fse:cameWith ?vehicle ;
                fse:body ?body;
                fse:title ?title;
                fse:hasCode ?code;
                fse:hasMissionManager [
                  foaf:firstName ?managerName ;
                  foaf:lastName ?managerSurname
                ];
            ]
        FILTER(?id = <${documentId}>)
      } 
  `)
  const res = (await query.execute()).results.bindings
  let transport: ModeOfTransport = null
  for (const elem of res) {
    transport = {
      vehicle: elem["vehicle"].value,
      title: elem["title"].value,
      body: elem["body"].value,
      code: elem["code"].value,
      missionManager: {
        name: elem["managerName"].value,
        surname: elem["managerSurname"].value,
      }
    }
  }  
  return transport
}

const fetchReasonForVisit = async (documentId: string): Promise<ReasonForVisit> => {
  const query = createStardogQuery(`
    SELECT *
      FROM <https://fse.ontology/>
      WHERE {
        ?id a fse:firstAidReport ;
          fse:hasSection [
            a fse:reasonForVisit;
            fse:title ?title;
            fse:body ?body ;
            fse:mainProblem [
              fse:statusCode ?statusCode ;
              fse:hasSymptom ?symptom ;
              fse:hasCode ?code ;
              fse:body ?observationBody
            ]
          ]
      FILTER(?id = <${documentId}>)
    } 
  `)
  const res = (await query.execute()).results.bindings
  let reason: ReasonForVisit = null
  for (const elem of res) {
    reason = {
      mainProblem: {
        statusCode: elem["statusCode"].value,
        body: elem["observationBody"].value,
        code: elem["code"].value,
        symptom: elem["symptom"].value
      },
      body: elem["body"].value,
      title: elem["title"].value
    }
  }  
  return reason
}

const fetchTriage = async (documentId: string): Promise<Triage> => {
  const query = createStardogQuery(`
    SELECT *
      FROM <https://fse.ontology/>
      WHERE {
        ?id a fse:firstAidReport;
          fse:hasSection [
            a fse:triage;
            fse:statusCode ?statusCode;
            fse:effectiveTime ?effectiveTime;
            fse:body ?body;
            fse:title ?title;
            fse:hasPerformer [
              foaf:firstName ?performerName;
              foaf:lastName ?performerSurname
            ];
          ]
          FILTER(?id = <${documentId}>)
        } 
  `)
  const res = (await query.execute()).results.bindings
  let triage: Triage = null
  for (const elem of res) {
    triage = {
      effectiveTime: elem["effectiveTime"].value,
      body: elem["body"].value,
      title: elem["title"].value,
      statusCode: elem["statusCode"].value,
      performer: {
        name: elem["performerName"].value,
        surname: elem["performerSurname"].value,
      }
    }
  }
  return triage
}

const fetchDischarge = async (documentId: string): Promise<Discharge> => {
  const query = createStardogQuery(`
    SELECT *
      FROM <https://fse.ontology/>
      WHERE {
        ?id 
          a fse:firstAidReport ;
            fse:hasSection [
              a fse:discharge;
              fse:statusCode ?statusCode ;
              fse:effectiveTime ?effectiveTime;
              fse:body ?body;
              fse:title ?title;
              fse:hasPerformer [
                foaf:firstName ?performerName ;
                foaf:lastName ?performerSurname
              ];
              fse:transfer [
                org:siteAddress ?transfer
              ]
          ]
        FILTER(?id = <${documentId}>)
      } 
  `)
  const res = (await query.execute()).results.bindings
  let discharge: Discharge = null
  for (const elem of res) {
    discharge = {
      effectiveTime: elem["effectiveTime"].value,
      body: elem["body"].value,
      title: elem["title"].value,
      statusCode: elem["statusCode"].value,
      performer: {
        name: elem["performerName"].value,
        surname: elem["performerSurname"].value,
      },
      transfer: elem["transfer"].value
    }
  }  
  return discharge
}


const useVpsStore = (documentId: string) => {
  const [modeOfTrasport] = createResource<ModeOfTransport>(() => fetchModeOfTransport(documentId))
  const [discharge] = createResource<Discharge>(() => fetchDischarge(documentId))
  const [reasonForVisit] = createResource<ReasonForVisit>(() => fetchReasonForVisit(documentId))
  const [triage] = createResource<Triage>(() => fetchTriage(documentId))

  return { modeOfTrasport, discharge, reasonForVisit, triage }
}

export default useVpsStore