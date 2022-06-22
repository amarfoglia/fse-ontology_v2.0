import { Component, createSignal, JSXElement, Match, Switch } from "solid-js"

interface Props {
  renderContent: () => JSXElement
  title?: string
  reasonForEmpty: string
  error: boolean
  loading: boolean
  empty: boolean
}

const FallbackWrapper: Component<Props> = (props) => (
  <Switch fallback={
    <div class="flex flex-col gap-6">
      {props.title ? <h1 class="text-3xl">{props.title}</h1> : <></>}
      {props.renderContent()}
    </div>
  }>
    <Match when={props.error}>
      <p class="text-center">Si è verificato un errore.</p>
    </Match>
    <Match when={props.loading}>
      <p class="text-center">Caricamento...</p>
    </Match>
    <Match when={props.empty}>
      <p class="text-center">{props.reasonForEmpty}</p>
    </Match>
  </Switch>
)

export default FallbackWrapper
