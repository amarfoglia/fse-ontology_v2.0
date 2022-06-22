import { Component, For } from "solid-js"
import usePrescriptionStore from "../../../hooks/usePrescriptionStore"
import { ClinicalDocument, Pharma } from "../../../models/ClinicalDocument"
import FallbackWrapper from "../../FallBackWrapper"
import { DocumentCard } from "../../PatientDocs"

interface Props {
  document: ClinicalDocument
}

const renderContent = (pharmaDoc: Pharma) => (
  <>
    <p><i class="mdi mdi-clipboard-alert mr-2"></i>{pharmaDoc.priority}</p>
    <div class="divider"></div>
    <For each={pharmaDoc.consumables}>{ consumable =>
      <p><i class="mdi mdi-pill mr-2"></i>{consumable}</p>
    }</For>
  </>
)

const PharmaBox: Component<Props> = (props) => {
  const { pharmaDoc } = usePrescriptionStore(props.document)
  return (
    <FallbackWrapper 
        reasonForEmpty="Nessuna informazione." 
        renderContent={() => <DocumentCard document={props.document} extraProps={renderContent(pharmaDoc())} />} 
        title="Prescrizioni Farmaceutiche"
        error={pharmaDoc?.error}
        loading={pharmaDoc?.loading}
        empty={pharmaDoc() == null}
    />
  )
}

export default PharmaBox