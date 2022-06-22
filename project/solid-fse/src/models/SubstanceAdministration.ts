import { OperatingProcedure } from "./OperatingProcedure"

interface SubstanceAdministration extends OperatingProcedure {
  effectiveTime?: string
  via: string
  doseQuantity: number
  unit: string
  approachSiteCode: string
  consumable?: string
  booster?: Booster
  preventedDisease?: string
  participant?: string
}

interface Booster {
  boosterNumber: number
  statusCode: string
  nextBooster?: string
  code?: string
}

export { SubstanceAdministration, Booster }