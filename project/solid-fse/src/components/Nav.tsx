import type { Component } from "solid-js"
import { NavLink, useLocation, useNavigate } from "solid-app-router"
import useSearch from "../hooks/useSearch"

const SearchBar: Component = () => {

  const { search, setSearch } = useSearch()

  const location = useLocation()
  const navigate = useNavigate()

  const onSubmit = (e: Event) => {
    e.preventDefault()
    if (location.pathname != "/") navigate("/")
  }

  return (
    <form onSubmit={onSubmit} class="flex">
      <input
        class="input w-72 rounded-r-none"
        type="text"
        placeholder="Cerca un paziente"
        value={search()}
        onKeyUp={(e) => setSearch(e.currentTarget.value)}
      />
      <button type="submit" class="btn rounded-l-none">
        <i class="mdi mdi-magnify"></i>
      </button>
    </form>
  )
}

const navLink = "text-lg text-white no-underline"

const Nav: Component = () => (
  <div class="container max-w-4xl flex items-center gap-6 p-6">
    <SearchBar/>
    <div class="flex-grow"></div>
    <NavLink class={navLink} href="/" end>Pazienti</NavLink>
    <NavLink class={navLink} href="/register">Registra</NavLink>
    <NavLink class={navLink} href="/queries">Query</NavLink>
  </div>
)

export default Nav