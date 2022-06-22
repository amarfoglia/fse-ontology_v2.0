import { Component, For } from "solid-js"
import usePrescriptionStore from "../../../hooks/usePrescriptionStore"
import { ClinicalDocument, Prescription } from "../../../models/ClinicalDocument"
import FallbackWrapper from "../../FallBackWrapper"
import { DocumentCard } from "../../PatientDocs"

interface Props {
  document: ClinicalDocument
}

const renderContent = (prescription: Prescription) => (
  <>
    <p><i class="mdi mdi-clipboard-alert mr-2"></i>{prescription.priority}</p>
  </>
)

const PrescriptionBox: Component<Props> = (props) => {
  const { prescriptionDoc } = usePrescriptionStore(props.document)
  return (
    <FallbackWrapper 
        reasonForEmpty="Nessuna informazione." 
        renderContent={() => <DocumentCard document={props.document} extraProps={renderContent(prescriptionDoc())} />} 
        title="Prescrizioni"
        error={prescriptionDoc?.error}
        loading={prescriptionDoc?.loading}
        empty={prescriptionDoc() == null}
    />
  )
}

export default PrescriptionBox