interface Person {
  name: string
  surname: string
}

interface Patient extends Person {
  birthDate: string
  fiscalCode: string
  healthCardNumber: string
  email: string
  phone: string
  familyDoctor: string
}

interface HealthWorker extends Person {}

export { Person, Patient, HealthWorker}