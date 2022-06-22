import { Component, For } from "solid-js"
import usePrescriptionStore from "../../../hooks/usePrescriptionStore"
import { ClinicalDocument, Specialist } from "../../../models/ClinicalDocument"
import FallbackWrapper from "../../FallBackWrapper"
import { DocumentCard } from "../../PatientDocs"

interface Props {
  document: ClinicalDocument
}

const renderContent = (specialistDoc: Specialist) => (
  <>
    <p><i class="mdi mdi-clipboard-alert mr-2"></i>{specialistDoc.priority}</p>
    <div class="divider"></div>
    <p><i class="mdi mdi-book-open mr-2"></i>{specialistDoc.diagnosis}</p>
  </>
)

const SpecialistBox: Component<Props> = (props) => {
  const { specialistDoc } = usePrescriptionStore(props.document)
  return (
    <FallbackWrapper 
        reasonForEmpty="Nessuna informazione." 
        renderContent={() => <DocumentCard document={props.document} extraProps={renderContent(specialistDoc())} />} 
        title="Prescrizioni Specialistiche"
        error={specialistDoc?.error}
        loading={specialistDoc?.loading}
        empty={specialistDoc() == null}
    />
  )
}

export default SpecialistBox