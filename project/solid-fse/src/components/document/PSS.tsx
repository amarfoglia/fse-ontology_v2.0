import { Component, createMemo, For } from "solid-js"
import useDocumentStore from "../../hooks/useDocumentStore"
import { ClinicalDocument } from "../../models/ClinicalDocument"
import { Alerts, HistoryOfDiseases, HistoryOfPregnancies, Medications, Specialty, Test, Therapy } from "../../models/Section"
import { formatDate, formatDateAndTime } from "../../utils/helpers"
import FallbackWrapper from "../FallBackWrapper"

interface DocProps {
  alert: Alerts
}

const AlertBox: Component<DocProps> = (props) => {
  const alert = createMemo(() => props.alert)
  return (
    <div class="flex gap-6 p-4 rounded-lg border-2 border-gray-600">
      <div class="
        avatar flex-shrink-0
        w-12 h-12 rounded-full
        flex justify-center items-center
        bg-blue-400 text-gray-700 text-2xl
      "><i class="mdi mdi-mushroom-outline"></i></div>
      <div class="flex flex-col flex-grow">
        <h2 class="text-xl mb-2">{alert().title}</h2>
        <div class="divider my-4"></div>
        <div class="flex flex-wrap gap-4 text-sm text-gray-400">
          <p><i class="mdi mdi-svg mr-2"></i>{alert().allergy}</p>
          <p><i class="mdi mdi-calendar mr-2"></i>{formatDateAndTime(alert().start)}</p>
          <p><i class="mdi mdi-calendar mr-2"></i>{formatDateAndTime(alert().end)}</p>
        </div>
      </div>
    </div>
  )
}

const TherapyBox: Component<{ therapy: Therapy }> = (props) => {
  const therapy = createMemo(() => props.therapy)
  const administration = therapy().administration
  return (
    <>
      <div class="flex flex-wrap gap-4 text-sm text-gray-400">
        <p><i class="mdi mdi-checkbox-multiple-blank-circle-outline mr-2"></i>{therapy().statusCode}</p>
        <p><i class="mdi mdi-delete-variant mr-2"></i>{therapy().dailyQuantity} (qt.)</p>
        <p><i class="mdi mdi-calendar mr-2"></i>{formatDate(therapy().start)}</p>
        <p><i class="mdi mdi-calendar mr-2"></i>{formatDate(therapy().end)}</p>
      </div>
      <div class="divider my-4"></div>
      <div class="flex flex-wrap gap-4 text-sm text-gray-400">
        {<p><i class="mdi mdi-svg mr-2"></i>{administration.preventedDisease}</p>}
        {<p><i class="mdi mdi-human mr-2"></i>{administration.via}</p>}
        {<p><i class="mdi mdi-pill mr-2"></i>{administration.consumable + ' (' + administration.doseQuantity + ' ' + administration.unit + ')'}</p>}
      </div>
    </>
  )
}

const MedicationBox: Component<{ medication: Medications }> = (props) => {
  const medication = createMemo(() => props.medication)
  let therapiesNum = 1
  return (
    <div class="flex gap-6 p-4 rounded-lg border-2 border-gray-600">
      <div class="
        avatar flex-shrink-0
        w-12 h-12 rounded-full
        flex justify-center items-center
        bg-blue-400 text-gray-700 text-2xl
      "><i class="mdi mdi-stethoscope"></i></div>
        <div class="flex flex-col flex-grow">
        <For each={medication().therapies}>{ therapy =>
          <div class="mb-4">
            <h2 class="text-xl mb-2">Terapia #{therapiesNum++}</h2>
            <div class="divider my-4"></div>
            <TherapyBox therapy={therapy} />
          </div>
        }</For>
        </div>
    </div>
  )
}

const renderAlerts = (alerts: Alerts[]) => (
  <For each={alerts}>{ alert =>
    <AlertBox alert={alert}/>
  }</For>
)

const renderMedications = (medications: Medications[]) => (
  <For each={medications}>{ medication =>
    <MedicationBox medication={medication}/>
  }</For>
)

const renderHistoryOfPregnancies = (historyOfPregnancies: HistoryOfPregnancies) => {
  let pregnancies = 1
  return (
    <div class="flex gap-6 p-4 rounded-lg border-2 border-gray-600">
      <div class="
        avatar flex-shrink-0
        w-12 h-12 rounded-full
        flex justify-center items-center
        bg-blue-400 text-gray-700 text-2xl
      "><i class="mdi mdi-human-pregnant"></i></div>
        <div class="flex flex-col flex-grow">
        <For each={historyOfPregnancies.pregnancies}>{ pregnancy =>
          <div class="mb-4">
            <h2 class="text-xl mb-2">Gravidanza #{pregnancies++}</h2>
            <div class="divider my-2"></div>
            <div class="flex flex-wrap gap-4 text-sm text-gray-400">
              <p>Risultato{
                  pregnancy.result ? 
                  <i class="ml-2 mdi mdi-checkbox-marked-circle-outline"></i>
                  :
                  <i class="ml-2 mdi mdi-close-circle-outline"></i>
                }
              </p>
              <p><i class="mdi mdi-calendar mr-2"></i>{formatDate(pregnancy.start)}</p>
              <p><i class="mdi mdi-calendar mr-2"></i>{formatDate(pregnancy.end)}</p>
            </div>
          </div>
        }</For>
        </div>
    </div>
  )
}

const renderHistoryOfDiseases = (historyOfDiseases: HistoryOfDiseases) => {
  let diseases = 1
  return (
    <div class="flex gap-6 p-4 rounded-lg border-2 border-gray-600">
      <div class="
        avatar flex-shrink-0
        w-12 h-12 rounded-full
        flex justify-center items-center
        bg-blue-400 text-gray-700 text-2xl
      "><i class="mdi mdi-svg"></i></div>
        <div class="flex flex-col flex-grow">
        <For each={historyOfDiseases.diseases}>{ disease =>
          <div class="mb-4">
            <h2 class="text-xl mb-2">Malattia #{diseases++}</h2>
            <div class="divider my-2"></div>
            <div class="flex flex-wrap gap-4 text-sm text-gray-400">
              <p><i class="mdi mdi-svg mr-2"></i>{disease.name}</p>
            </div>
          </div>
        }</For>
        </div>
    </div>
  )
}

interface Props {
  document: ClinicalDocument
}

const PSS: Component<Props> = (props) => {
  const { alerts, medications, historyOfPregnancies, historyOfDiseases } = useDocumentStore(props.document.id)

  return (
    <>
      <FallbackWrapper
        reasonForEmpty="Nessuna allergia."
        renderContent={() => renderAlerts(alerts())}
        title="Allergie"
        error={alerts?.error}
        loading={alerts?.loading}
        empty={alerts()?.length == 0} />
      <FallbackWrapper
        reasonForEmpty="Nessuna terapia."
        renderContent={() => renderMedications(medications())}
        title="Terapie"
        error={medications?.error}
        loading={medications?.loading}
        empty={medications()?.length == 0} />
      <FallbackWrapper
        reasonForEmpty="Nessuna gravidanza."
        renderContent={() => renderHistoryOfPregnancies(historyOfPregnancies())}
        title="Gravidanze e Parti"
        error={historyOfPregnancies?.error}
        loading={historyOfPregnancies?.loading}
        empty={historyOfPregnancies() == null} />
      <FallbackWrapper
        reasonForEmpty="Nessuna malattia."
        renderContent={() => renderHistoryOfDiseases(historyOfDiseases())}
        title="Elenco Malattie"
        error={historyOfDiseases?.error}
        loading={historyOfDiseases?.loading}
        empty={historyOfDiseases() == null} />
    </>
  )
}

export default PSS