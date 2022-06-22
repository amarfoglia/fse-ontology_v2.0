import { createSignal } from "solid-js"

const [search, setSearch] = createSignal("")

const setSearchToLower = (search: string) => setSearch(search.toLowerCase())

export default () => ({ search, setSearch })