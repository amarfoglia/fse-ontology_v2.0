import { Component } from "solid-js"
import useQueriesStore from "../hooks/useQueriesStore"

const CustomQuery: Component = () => {
  const { queryCode, setQueryCode, runQuery } = useQueriesStore()

  let textArea: HTMLTextAreaElement
  const allowTab = (e: Event) => {
    const ke = e as KeyboardEvent
    if (ke.key == "Tab" && !ke.shiftKey) {
      ke.preventDefault()
      const value = textArea.value
      const selectionStart = textArea.selectionStart
      const selectionEnd = textArea.selectionEnd
      textArea.value = `${value.substring(0, selectionStart)}  ${value.substring(selectionEnd)}`
      textArea.selectionStart = selectionEnd + 2 - (selectionEnd - selectionStart)
      textArea.selectionEnd = selectionEnd + 2 - (selectionEnd - selectionStart)
    }
  }

  return (
    <div class="flex gap-2">
      <textarea
        ref={textArea}
        class="input font-mono flex-grow min-h-[192px]"
        placeholder="Query personalizzata"
        value={queryCode()}
        onKeyUp={(e) => setQueryCode(e.currentTarget.value)}
        onKeyDown={allowTab}
      ></textarea>
      <button
        class="btn mb-auto"
        title="Esegui"
        onClick={() => runQuery({ name: "Custom query", code: queryCode() })}
      ><i class="mdi mdi-play"></i></button>
    </div>
  )
}

export default CustomQuery