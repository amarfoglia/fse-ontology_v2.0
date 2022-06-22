import { Component, createMemo, For, JSXElement } from "solid-js"
import useDocumentStore from "../../hooks/useDocumentStore"
import { ClinicalDocument } from "../../models/ClinicalDocument"
import { ImmunizationCard } from "../../models/Section"
import { Booster, SubstanceAdministration } from "../../models/SubstanceAdministration"
import { formatDate } from "../../utils/helpers"
import FallbackWrapper from "../FallBackWrapper"

interface DocProps {
  card: ImmunizationCard
}

const renderAdministration = (administration: SubstanceAdministration): JSXElement => {
  const booster = administration.booster
  return (
    <>
      <div class="divider mb-4"></div>
      <div class="flex flex-wrap gap-4 text-sm text-gray-400">
        {<p><i class="mdi mdi-svg mr-2"></i>{administration.preventedDisease}</p>}
        {<p><i class="mdi mdi-human mr-2"></i>{administration.via}</p>}
        {<p><i class="mdi mdi-pill mr-2"></i>{administration.consumable + ' (' + administration.doseQuantity + ' ' + administration.unit + ')'}</p>}
        <p><i class="mdi mdi-calendar mr-2"></i>{formatDate(administration.effectiveTime)}</p>
        <p><i class="mdi mdi-account-multiple mr-2"></i>{administration.participant}</p>
      </div>
      <div class="divider my-4"></div>
      <h3 class="text-base mb-2">Richiamo #{booster.boosterNumber}</h3>
      <div class="flex flex-wrap gap-4 text-sm text-gray-400">
        <p><i class="mdi mdi-checkbox-multiple-blank-circle-outline mr-2"></i>{booster.statusCode}</p>
        {booster.nextBooster ? <p><i class="mdi mdi-skip-next mr-2"></i>{formatDate(booster.nextBooster)}</p> : <></>}
      </div>
    </>
  )
}

const ImmunizationBox: Component<DocProps> = (props) => {
  const card = createMemo(() => props.card)
  
  return (
    <div class="flex gap-6 p-4 rounded-lg border-2 border-gray-600">
      <div class="
        avatar flex-shrink-0
        w-12 h-12 rounded-full
        flex justify-center items-center
        bg-blue-400 text-gray-700 text-2xl
      "><i class="mdi mdi-needle"></i></div>
      <div class="flex flex-col flex-grow">
        <h2 class="text-xl mb-2">
          {card().title}
        </h2>
        <p class="line-clamp-2 mb-4">{card().body}</p>
        {renderAdministration(card().administration)}
      </div>
    </div>
  )
}

interface Props {
  document: ClinicalDocument
}

const renderContent = (cards: ImmunizationCard[]) => (
  <For each={cards}>{ card =>
    <ImmunizationBox card={card}/>
  }</For>
)

const Immunization: Component<Props> = (props) => {
  const { immunizationCards } = useDocumentStore(props.document.id)
  return (
    <FallbackWrapper 
        reasonForEmpty="Nessuna vaccinazione." 
        renderContent={() => renderContent(immunizationCards())} 
        title="Vaccinazioni"
        error={immunizationCards?.error}
        loading={immunizationCards?.loading}
        empty={immunizationCards()?.length == 0}
    />
  )
}

export default Immunization