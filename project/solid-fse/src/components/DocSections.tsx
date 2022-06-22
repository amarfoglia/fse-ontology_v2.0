import { Component, For } from "solid-js"
import { ClinicalDocument } from "../models/ClinicalDocument"
import formatDocumentType from "../utils/formatDocumentType"
import Immunization from "./document/Immunization"
import PharmaBox from "./document/prescriptions/Pharma"
import PrescriptionBox from "./document/prescriptions/Prescription"
import SpecialistBox from "./document/prescriptions/Specialist"
import PSS from "./document/PSS"
import RSA from "./document/RSA"
import SpecialtyCard from "./document/SpecialtyCard"
import VPS from "./document/VPS"

const DocSections: Component<{ document: ClinicalDocument; goBack: () => void }> = (props) => {

  const renderDocumentContent = (document: ClinicalDocument) => {
    const type = formatDocumentType(document.documentType)
    switch(type) {
      case "Referto di Radiologia": return <></>
      case "Vaccinazioni": return <Immunization document={document} />
      case "Verbale di Pronto Soccorso": return <VPS document={document} />
      case "Referto di Specialistica Ambulatoriale": return <RSA document={document} />
      case "Documento di Esenzione": return <></>
      case "Lettera di Dimissione Ospedaliera": return <></>
      case "Prescrizione": return <></>
      case "Referto di Medicina di Laboratorio": return <SpecialtyCard document={document} />
      case "Profilo Sanitario Sintetico": return <PSS document={document} />
      case "Prescrizione Farmaceutica": return <PharmaBox document={document}></PharmaBox>
      case "Prescrizione Specialistica": return <SpecialistBox document={document}/>
      case "Prescrizione di Ricovero": return <PrescriptionBox document={document}/>
      case "Prescrizione di Trasporto": return <PrescriptionBox document={document}/>
    }
  }

  return (
    <div class="gap-12">
      <div class="flex flex-col gap-4">
        {renderDocumentContent(props.document)}
      </div>
      <div class="grid justify-end">
        <button class="btn mt-6 mx-auto px-10" onClick={props.goBack}>Indietro</button>
      </div>
    </div>
  )
}

export default DocSections