import { Component, For } from "solid-js"
import useQueriesStore from "../hooks/useQueriesStore"
import { Query } from "../models/Query"
import CustomQuery from "../components/CustomQuery"
import QueryResult from "../components/QueryResult"

const QueryCard: Component<{ query: Query }> = (props) => {
  const { runQuery } = useQueriesStore()

  return (
    <div class="flex items-center gap-6">
      <div class="
        avatar
        w-12 h-12 rounded-full
        flex justify-center items-center
        bg-blue-400 text-gray-700 text-2xl
      "><i class="mdi mdi-file-search-outline"></i></div>
      <p class="flex-grow">{props.query.name}</p>
      {props.query?.options?.reasoning &&
        <p class="text-xs uppercase font-bold px-2 py-1 rounded text-gray-300 bg-gray-700">Reasoning</p>}
      <div class="flex gap-2">
        <button
          class="btn"
          title="Esegui"
          onClick={() => runQuery(props.query)}
        ><i class="mdi mdi-play"></i></button>
      </div>
    </div>
  )
}

const QueriesPage: Component = () => {
  const { queries } = useQueriesStore()
  return (
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-6">
        <For each={queries}>{ query => <QueryCard query={query}/> }</For>
      </div>
      <CustomQuery/>
      <div></div>
      <QueryResult/>
    </div>
  )
}

export default QueriesPage