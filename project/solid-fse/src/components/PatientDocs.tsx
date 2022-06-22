import { Link, useLocation, useNavigate } from "solid-app-router"
import { Component, createMemo, For, JSXElement, Match, Resource, Switch } from "solid-js"
import { ClinicalDocument } from "../models/ClinicalDocument"
import { formatDate, formatIndividual } from "../utils/helpers"
import formatDocumentType from "../utils/formatDocumentType"
import FallbackWrapper from "./FallBackWrapper"

interface DocProps {
  document: ClinicalDocument
  extraProps?: JSXElement
}

const ConfidentialTooltip: Component<{ confidentialityLevel: string }> = (props) => {
  const tooltipText = <span class="tooltiptext bg-blue-400 text-gray-700">{props.confidentialityLevel.replace("_", " ")}</span>
  switch(props.confidentialityLevel) {
    case "Normal": return <i class="text-blue-400 mdi mdi-alert-circle tooltip">{tooltipText}</i>
    case "Restricted": return <i class="text-yellow-400 mdi mdi-alert-circle tooltip">{tooltipText}</i>
    case "Very_Restricted": return <i class="text-red-400 mdi mdi-alert-circle tooltip">{tooltipText}</i>
    default: return <></>
  }
}

const DocumentCard: Component<DocProps> = (props) => {
  const document = createMemo(() => props.document)

  return (
    <div class="flex gap-6 p-4 rounded-lg border-2 border-gray-600 card ">
      <div class="
        avatar flex-shrink-0
        w-12 h-12 rounded-full
        flex justify-center items-center
        bg-blue-400 text-gray-700 text-2xl
      "><i class="mdi mdi-file-document-outline"></i></div>
      <div class="flex flex-col flex-grow">
        <div class="flex flex-wrap gap-4 items-baseline mb-4 justify-between">
          <h2 class="text-xl">
            {formatDocumentType(document().documentType)}
          </h2>
          <ConfidentialTooltip confidentialityLevel={formatIndividual(document().confidentialityCode)} />
        </div>
        <div class="flex flex-wrap gap-4 text-sm text-gray-400">
          <p><i class="mdi mdi-key mr-2"></i>{document().id}</p>
          {document().humanAuthor && <p><i class="mdi mdi-account-circle mr-2"></i>{document().humanAuthor}</p>}
          <p><i class="mdi mdi-flag-outline mr-2"></i>{document().languageCode}</p>
          {document().organization && <p><i class="mdi mdi-domain mr-2"></i>{document().organization}</p>}
          <p><i class="mdi mdi-calendar mr-2"></i>{formatDate(document().createdAt)}</p>
          {
            document().signatory 
            ? 
              <p class="tooltip">
                <i class="mdi mdi-pen mr-2"></i>{document().signatory}
                <span class="tooltiptext bg-blue-400 text-gray-700">{formatDate(document().signTime)}</span>
              </p>
            :
              <></>
          }
          {
            document().inFulfillmentOf 
            ?
              <p><i class="mdi mdi-link-variant mr-2">{document().inFulfillmentOf}</i></p>
            :
              <></>
          }
          {props.extraProps}
        </div>
        <div class="divider my-4"></div>
        <p class="line-clamp-2">{document().body}</p>
      </div>
    </div>
  )
}

interface LinkedDocProps {
  document: ClinicalDocument
  onClick: (doc: ClinicalDocument) => void
}

const LinkedDocumentCard: Component<LinkedDocProps> = (props) => {
  return (
    <Link
      href="#"
      class="no-underline flex items-center gap-6 hover:bg-gray-700 transition-colors"
      onClick={() => props.onClick(props.document)}
    >
      <DocumentCard document={props.document} />
    </Link>

  )
}

interface Props {
  documents: Resource<ClinicalDocument[]>
  onDocumentClick: (doc: ClinicalDocument) => void
}

const renderContent = (documents: ClinicalDocument[], onClick: (doc: ClinicalDocument) => void) => (
  <For each={documents}>{ document =>
    <LinkedDocumentCard document={document} onClick={onClick}/>
  }</For>
)

const PatientDocs: Component<Props> = (props) => {
  return (
    <FallbackWrapper 
        reasonForEmpty="Nessun documento." 
        renderContent={() => renderContent(props.documents(), props.onDocumentClick)} 
        title="Documenti"
        error={props.documents.error}
        loading={props.documents.loading}
        empty={props.documents()?.length == 0}
    />
  )
}

export default PatientDocs

export { DocumentCard }