export interface OperatingProcedure {
  name?: string
}

interface Procedure extends OperatingProcedure { }

export interface Observation extends OperatingProcedure { }
