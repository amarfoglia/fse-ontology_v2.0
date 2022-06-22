import { Component, createSignal, Match, Switch } from "solid-js"
import { useParams } from "solid-app-router"
import usePatientStore from "../hooks/usePatientStore"
import PatientInfo from "../components/PatientInfo"
import PatientDocs from "../components/PatientDocs"
import DocSections from "../components/DocSections"
import { ClinicalDocument } from "../models/ClinicalDocument"

const PatientPage: Component = () => {
  const params = useParams()
  const { patient, documents } = usePatientStore(params.fiscalCode)

  const [document, setDocument] = createSignal<ClinicalDocument>(null);

  const goBack = () => setDocument(null)

  const showDocumentDetails = (doc: ClinicalDocument) => setDocument(doc)

  
  return (
    <div class="patient flex gap-12">
      <div class="w-1/4"><PatientInfo patient={patient}/></div>
      <Switch>
        <Match when={document()}>
          <div class="w-3/4"><DocSections document={document()} goBack={goBack} /></div>
        </Match>
        <Match when={!document()}>
          <div class="w-3/4"><PatientDocs documents={documents} onDocumentClick={showDocumentDetails} /></div>
        </Match>
      </Switch>
    </div>
  )
}

export default PatientPage