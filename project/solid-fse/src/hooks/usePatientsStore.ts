import { createResource } from "solid-js"
import { Patient } from "../models/Person"
import mapBindingsToValues from "../utils/mapBindingsToValues"
import createStardogQuery from "./createStardogQuery"

const fetchPatients = async () => {
  const query = createStardogQuery(`
    SELECT ?id ?name ?surname ?birthDate ?fiscalCode
    FROM <https://fse.ontology/>
    WHERE {
      ?id
        a fse:patient ;
        foaf:firstName ?name ;
        foaf:lastName ?surname ;
        foaf:birthday ?birthDate ;
        fse:fiscalCode ?fiscalCode .
    }
  `)
  const res = (await query.execute()).results.bindings
  const patients = mapBindingsToValues(res)
  return patients as Patient[]
}

const [patients] = createResource<Patient[]>(fetchPatients, { initialValue: [] })

export default () => patients