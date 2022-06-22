import { createResource } from "solid-js"
import { Alerts, Disease, HistoryOfDiseases, HistoryOfPregnancies, ImmunizationCard, Medications, Pregnancy, Specialty, Therapy } from "../models/Section"
import mapBindingsToValues from "../utils/mapBindingsToValues"
import createStardogQuery from "./createStardogQuery"

const fetchImmunizationCards = async (documentId: string): Promise<ImmunizationCard[]> => {
  const query = createStardogQuery(`
    SELECT ?title ?body ?approachSiteCode ?doseQuantity ?unit ?preventedDisease 
      ?consumable ?via ?participant ?effectiveTime
      (CONCAT(?participantName, " ", ?participantSurname) AS ?participant)
      ?boosterNumber ?boosterStatus ?nextBooster
      FROM <https://fse.ontology/>
      WHERE {
        ?id a fse:immunization ;
          fse:hasSection [
            fse:title ?title ;
            fse:body ?body; 
            fse:includesAdministration [
              fse:approachSiteCode ?approachSiteCode ;
              fse:doseQuantity ?doseQuantity ;
              fse:unit ?unit ;
              fse:prevents ?preventedDisease ;
              fse:consumable ?consumable ;
              fse:via ?via;
              fse:effectiveTime ?effectiveTime;
              fse:participant [
                foaf:firstName ?participantName ;
                foaf:lastName ?participantSurname
              ];
              fse:boosterOf ?booster
            ]
          ].
        ?booster fse:boosterNum ?boosterNumber ;
                 fse:statusCode ?boosterStatus;
        OPTIONAL {
            ?booster fse:nextBooster ?nextBooster
        }
        FILTER(?id = <${documentId}>)
      }
  `)
  const res = (await query.execute()).results.bindings
  const immunizationCards: ImmunizationCard[] = []

  for (const elem of res) {
    immunizationCards.push({
      title: elem["title"].value,
      body: elem["body"].value,
      administration: {
        approachSiteCode: elem["approachSiteCode"].value,
        doseQuantity: elem["doseQuantity"].value,
        effectiveTime: elem["effectiveTime"].value,
        unit: elem["unit"].value,
        via: elem["via"].value,
        consumable: elem["consumable"].value,
        booster: {
          boosterNumber: elem["boosterNumber"].value,
          statusCode: elem["boosterStatus"].value,
          nextBooster: elem["nextBooster"] ? elem["nextBooster"].value : null
        },
        participant: elem["participant"].value,
        preventedDisease: elem["preventedDisease"].value
      }
    })
  }  

  return immunizationCards
}

const fetchSpecialties = async (documentId: string): Promise<Specialty[]> => {
  const query = createStardogQuery(`
    SELECT ?title ?name ?result ?method ?code ?material ?unit
      FROM <https://fse.ontology/>
      WHERE {
        ?id a fse:laboratoryMedicineReport ;
            fse:hasSection [
                  fse:title ?title ;
                  fse:hasCode ?code ;
                  fse:hasResult [
                        fse:name ?name ;
                        fse:result ?result ;
                        fse:method ?method ;
                        fse:material ?material ;
                        fse:unit ?unit ;      
                  ] 
            ] 
          FILTER(?id = <${documentId}>)
      }
  `)
  const res = (await query.execute()).results.bindings
  const specialties: Specialty[] = []

  for (const elem of res) {
    specialties.push({
      title: elem["title"].value,
      code: elem["code"].value,
      test: {
        name: elem["name"].value,
        method: elem["method"].value,
        material: elem["material"].value,
        result: elem["result"].value,
        unit: elem["unit"].value,
      }
    })
  }
  return specialties
}

const fetchAlerts = async (documentId: string): Promise<Alerts[]> => {
  const query = createStardogQuery(`
    SELECT ?title ?start ?end ?allergy 
      FROM <https://fse.ontology/>
      WHERE {
        ?id a fse:summaryHealthProfile ;
            #fse:code ?code ;
            fse:hasSection [
              a fse:alerts;
                  fse:title ?title;
                  fse:start ?start;
                  fse:end ?end;
                  fse:includesAllergy ?allergy
            ] 
            FILTER(?id = <${documentId}>)
      }
  `)
  const res = (await query.execute()).results.bindings
  return mapBindingsToValues(res) as Alerts[]
}

const fetchTherapies = async (medicationsId: string): Promise<Therapy[]> => {
  const query = createStardogQuery(`
    SELECT *
      FROM <https://fse.ontology/>
      WHERE {
        ?id a fse:medications;
        fse:includesTherapy [
            fse:start ?start ;
            fse:end ?end ;
            fse:dailyQuantity ?dailyQuantity ;
            fse:statusCode ?statusCode ;
            fse:includesAdministration [
                fse:approachSiteCode ?approachSiteCode ;
                fse:doseQuantity ?doseQuantity ;
                fse:unit ?unit ;
                fse:prevents ?preventedDisease ;
                fse:consumable ?consumable ;
                fse:via ?via
            ]
        ]
        FILTER(?id = <${medicationsId}>)
      }
  `)
  const res = (await query.execute()).results.bindings
  const therapies: Therapy[] = []

  for (const elem of res) {
    therapies.push({
      dailyQuantity: elem["dailyQuantity"].value,
      statusCode: elem["statusCode"].value,
      start: elem["start"].value,
      end: elem["end"].value,
      administration: {
        approachSiteCode: elem["approachSiteCode"].value,
        doseQuantity: elem["doseQuantity"].value,
        preventedDisease: elem["preventedDisease"].value,
        unit: elem["unit"].value,
        via: elem["via"].value,
        consumable: elem["consumable"].value,
      }
    })
  }
  return therapies
}

const fetchMedications = async (documentId: string): Promise<Medications[]> => {
  const query = createStardogQuery(`
    SELECT ?sect ?title
      FROM <https://fse.ontology/>
      WHERE {
        ?id a fse:summaryHealthProfile ;
            fse:hasSection ?sect.
              ?sect a fse:medications;
                      fse:title ?title;
        FILTER(?id = <${documentId}>)
      } 
  `)
  const res = (await query.execute()).results.bindings
  const medications: Medications[] = []
  for (const elem of res) {
    medications.push({
      title: elem["title"].value,
      therapies: await fetchTherapies(elem["sect"].value)
    })
  }  
  return medications
}

const fetchPregnancies = async (sectionId: string): Promise<Pregnancy[]> => {
  const query = createStardogQuery(`
    SELECT ?start ?end ?result
      FROM <https://fse.ontology/>
      WHERE {
        ?id a fse:historyOfPregnancies;
            fse:includesPregnancy [
                fse:start ?start ;
                fse:end ?end ;
                fse:result ?result
            ]
        FILTER(?id = <${sectionId}>)
      }
  `)
  const res = (await query.execute()).results.bindings
  return mapBindingsToValues(res) as Pregnancy[]
}

const fetchHistoryOfPregnancies = async (documentId: string): Promise<HistoryOfPregnancies> => {
  const query = createStardogQuery(`
    SELECT ?sect ?title
      FROM <https://fse.ontology/>
      WHERE {
        ?id a fse:summaryHealthProfile ;
            fse:hasSection ?sect.
              ?sect a fse:historyOfPregnancies;
                      fse:title ?title;
        FILTER(?id = <${documentId}>)
      } 
  `)
  const res = (await query.execute()).results.bindings
  let historyOfPregnancies: HistoryOfPregnancies
  for (const elem of res) {
    historyOfPregnancies = {
      title: elem["title"].value,
      pregnancies: await fetchPregnancies(elem["sect"].value)
    }
  }  
  return historyOfPregnancies
}


const fetchDiseases = async (sectionId: string): Promise<Disease[]> => {
  const query = createStardogQuery(`
    SELECT ?name
      FROM <https://fse.ontology/>
      WHERE {
        ?id a fse:historyOfDiseases;
            fse:includesDisease ?name
        FILTER(?id = <${sectionId}>)
      }
  `)
  const res = (await query.execute()).results.bindings
  return mapBindingsToValues(res) as Disease[]
}

const fetchHistoryOfDiseases = async (documentId: string): Promise<HistoryOfDiseases> => {
  const query = createStardogQuery(`
    SELECT ?sect ?title
      FROM <https://fse.ontology/>
      WHERE {
        ?id a fse:summaryHealthProfile ;
            fse:hasSection ?sect.
              ?sect a fse:historyOfDiseases;
                      fse:title ?title;
        FILTER(?id = <${documentId}>)
      } 
  `)
  const res = (await query.execute()).results.bindings
  let historyOfDiseases: HistoryOfDiseases
  for (const elem of res) {
    historyOfDiseases = {
      title: elem["title"].value,
      diseases: await fetchDiseases(elem["sect"].value)
    }
  }  
  return historyOfDiseases
}

const useDocumentStore = (documentId: string) => {
  const [immunizationCards] = createResource<ImmunizationCard[]>(() => fetchImmunizationCards(documentId))
  const [specialties] = createResource<Specialty[]>(() => fetchSpecialties(documentId))
  const [alerts] = createResource<Alerts[]>(() => fetchAlerts(documentId))
  const [medications] = createResource<Medications[]>(() => fetchMedications(documentId))
  const [historyOfPregnancies] = createResource<HistoryOfPregnancies>(() => fetchHistoryOfPregnancies(documentId))
  const [historyOfDiseases] = createResource<HistoryOfDiseases>(() => fetchHistoryOfDiseases(documentId))

  return { immunizationCards, specialties, alerts, medications, historyOfPregnancies, historyOfDiseases }
}



export default useDocumentStore