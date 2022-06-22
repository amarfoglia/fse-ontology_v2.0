import { batch, Component, createMemo, createSignal } from "solid-js"
import createStardogQuery from "../hooks/createStardogQuery"

const RegisterPage: Component = () => {

  const [name, setName] = createSignal("")
  const [surname, setSurname] = createSignal("")
  const [birthDate, setBirthDate] = createSignal("")
  const [fiscalCode, setFiscalCode] = createSignal("")
  const [healthCardNumber, setHealthCardNumber] = createSignal("")

  const canSubmit = createMemo(() =>
    name() != "" &&
    surname() != "" &&
    birthDate() != "" &&
    fiscalCode() != "" &&
    healthCardNumber() != ""
  )

  const onSubmit = async (e: Event) => {
    e.preventDefault()
    try {
      const query = createStardogQuery(`
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        INSERT DATA {
            GRAPH <https://fse.ontology/> {
                # PATIENTS
                <#${fiscalCode()}>
                  a fse:patient ;
                  foaf:firstName "${name()}" ;
                  foaf:lastName "${surname()}" ;
                  foaf:birthday "${birthDate()}" ;
                  fse:fiscalCode "${fiscalCode()}" ;
                  fse:healthCardNumber "${healthCardNumber()}" .
            }
        }
      `)
      await query.execute()
      resetForm()
      alert(`Paziente ${name()} ${surname()} registrato con successo.`)
    } catch {
      alert("Si è verificato un errore.")
    }
  }

  const resetForm = () => batch(() => {
    setName("")
    setSurname("")
    setBirthDate("")
    setFiscalCode("")
    setHealthCardNumber("")
  })

  return (
    <form class="flex flex-col gap-6" onSubmit={onSubmit}>

      <div class="flex gap-6">
        <div class="w-1/2">
          <span class="block ml-2 mb-2">Nome</span>
          <input
            class="input w-full"
            type="text"
            placeholder="Mario"
            value={name()}
            onKeyUp={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div class="w-1/2">
          <span class="block ml-2 mb-2">Cognome</span>
          <input
            class="input w-full"
            type="text"
            placeholder="Rossi"
            value={surname()}
            onKeyUp={(e) => setSurname(e.currentTarget.value)}
          />
        </div>
      </div>
      <div>
        <span class="block ml-2 mb-2">Data di nascita</span>
        <input
          class="input w-full"
          type="text"
          placeholder="01/01/1990"
          value={birthDate()}
          onKeyUp={(e) => setBirthDate(e.currentTarget.value)}
        />
      </div>
      <div>
        <span class="block ml-2 mb-2">Codice fiscale</span>
        <input
          class="input w-full"
          type="text"
          placeholder="RSSMRO62B25E205Y"
          value={fiscalCode()}
          onKeyUp={(e) => setFiscalCode(e.currentTarget.value)}
        />
      </div>
      <div>
        <span class="block ml-2 mb-2">Numero di tessera sanitaria</span>
        <input
          class="input w-full"
          type="text"
          placeholder="80380800301234567890"
          value={healthCardNumber()}
          onKeyUp={(e) => setHealthCardNumber(e.currentTarget.value)}
        />
      </div>

      <button type="submit" class="btn mt-6 mx-auto px-20" disabled={!canSubmit()}>Registra utente</button>
    </form>
  )
}

export default RegisterPage