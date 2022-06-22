export interface StardogQueryOptions {
  reasoning: boolean
  limit: number
  offset: number
}

const STARDOG_LIMIT = 150000

export const defaultOptions: StardogQueryOptions = {
  reasoning: true,
  limit: STARDOG_LIMIT,
  offset: 0
}

export interface StardogQueryResult {
  head: {
    vars: string[]
  }
  results: {
    bindings: unknown[]
  }
}