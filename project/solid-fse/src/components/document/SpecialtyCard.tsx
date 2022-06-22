import { Component, createMemo, For } from "solid-js"
import useDocumentStore from "../../hooks/useDocumentStore"
import { ClinicalDocument } from "../../models/ClinicalDocument"
import { Specialty, Test } from "../../models/Section"
import FallbackWrapper from "../FallBackWrapper"

interface DocProps {
  specialty: Specialty
}

const SpecialtyBox: Component<DocProps> = (props) => {
  const specialty = createMemo(() => props.specialty)
  const test = specialty().test
  const content = specialty().body ? specialty().body : test.result
  
  return (
    <div class="flex gap-6 p-4 rounded-lg border-2 border-gray-600">
      <div class="
        avatar flex-shrink-0
        w-12 h-12 rounded-full
        flex justify-center items-center
        bg-blue-400 text-gray-700 text-2xl
      "><i class="mdi mdi-flask-outline"></i></div>
      <div class="flex flex-col flex-grow">
        <h2 class="text-xl mb-2">{test.name}</h2>
        <p class="line-clamp-2 mb-4">{content}</p>
        <div class="divider my-4"></div>
        <div class="flex flex-wrap gap-4 text-sm text-gray-400">
          <p><i class="mdi mdi-microscope mr-2"></i>{test.method}</p>
          <p><i class="mdi mdi-bio mr-2"></i>{test.material} ({test.unit})</p>
          {test.latestVersion ? <p><i class="mdi mdi-link-variant mr-2">{test.latestVersion}</i></p> : <></>}
        </div>
      </div>
    </div>
  )
}

interface Props {
  document: ClinicalDocument
}

const renderContent = (specialties: Specialty[]) => (
  <For each={specialties}>{ specialty =>
    <SpecialtyBox specialty={specialty}/>
  }</For>
)

const SpecialtyCard: Component<Props> = (props) => {
  const { specialties } = useDocumentStore(props.document.id)

  return (
    <FallbackWrapper 
        reasonForEmpty="Nessun esame." 
        renderContent={() => renderContent(specialties())} 
        title="Esami di laboratorio"
        error={specialties?.error}
        loading={specialties?.loading}
        empty={specialties()?.length == 0}
    />
  )
}

export default SpecialtyCard