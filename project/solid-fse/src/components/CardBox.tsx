import { Component, JSXElement } from "solid-js"

interface CardBoxProps {
  title: string,
  body: string,
  iconName: string,
  children?: JSXElement
}

const CardBox: Component<CardBoxProps> = (props) => (
  <div class="flex gap-6 p-4 rounded-lg border-2 border-gray-600">
    <div class="
      avatar flex-shrink-0
      w-12 h-12 rounded-full
      flex justify-center items-center
      bg-blue-400 text-gray-700 text-2xl
    "><i class={`mdi mdi-${props.iconName}`}></i></div>
    <div class="flex flex-col flex-grow">
      <h2 class="text-xl mb-2">
        {props.title}
      </h2>
      <p class="line-clamp-2 mb-4">{props.body}</p>
      <div class="divider mb-4"></div>
      {props.children}
    </div>
  </div>
)

export default CardBox