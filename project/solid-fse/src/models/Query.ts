import { StardogQueryOptions } from "./Stardog"

export interface Query {
  name: string
  code: string
  options?: Partial<StardogQueryOptions>
}