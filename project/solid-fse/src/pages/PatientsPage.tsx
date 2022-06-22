import { Component, createMemo, For, Match, Switch } from "solid-js"
import { Link } from "solid-app-router"
import usePatientsStore from "../hooks/usePatientsStore"
import useSearch from "../hooks/useSearch"
import { Patient } from "../models/Person"

const PatientCard: Component<{ patient: Patient }> = (props) => {
  const avatarLetters = createMemo(
    () => `${props.patient.name[0]}${props.patient.surname[0]}`.toUpperCase()
  )

  return (
    <Link
      href={`/patients/${props.patient.fiscalCode}`}
      class="no-underline flex items-center gap-6 rounded-full hover:bg-gray-700 transition-colors"
    >
      <div class="
        avatar
        w-12 h-12 rounded-full
        flex justify-center items-center
        bg-blue-400 text-gray-700 text-lg
      ">{avatarLetters()}</div>
      <div class="info flex-grow">
        <p>{props.patient.name} {props.patient.surname}</p>
      </div>
      <p class="birth text-gray-400 mr-4">{props.patient.birthDate}</p>
    </Link>
  )
}

const PatientsPage: Component = () => {

  const { search } = useSearch()

  const patients = usePatientsStore()
  const filteredPatients = createMemo(() =>
    patients().filter(p => p.name.concat(" ").concat(p.surname).toLowerCase()
      .includes(search().toLowerCase()))
  )

  return (
    <Switch fallback={
      <div class="flex flex-col gap-4">
        <For each={filteredPatients()}>{ patient =>
          <PatientCard patient={patient}/>
        }</For>
      </div>
    }>
      <Match when={patients.error}>
        <p class="text-center">Si è verificato un errore.</p>
      </Match>
      <Match when={patients.loading}>
        <p class="text-center">Caricamento...</p>
      </Match>
    </Switch>
  )
}

export default PatientsPage