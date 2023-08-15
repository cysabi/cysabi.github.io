import { onMount } from "solid-js"
import { A } from "@solidjs/router"
import { useGrid } from "./grid"

const WorkTemplate = props => {
  const { setColor } = useGrid()
  onMount(() => {
    setColor("#59786b")
  })
  return (
    <div class="mx-auto gap-8 max-w-7xl px-[min(10vw,128px)]">
      <div class="flex flex-col gap-4 w-full items-center text-center py-16">
        <div class="text-4xl font-semibold font-mono">{props.name}</div>
        <div class="text-xl">{props.desc}</div>
        <div class="flex gap-2">
          {props.tags.map(tag => (
            <div class="py-0.5 px-3 bg-[#3b6ea2]/30 font-medium rounded-full text-[#acc9eb] backdrop-brightness-125">
              {tag}
            </div>
          ))}
        </div>
      </div>
      <article class="prose prose-invert prose-xl mx-auto">
        {props.children}
      </article>
      <div class="flex w-full justify-center pt-16">
        <A
          href="/"
          class="border-2 rounded-xl no-underline hover:bg-slate-800 hover:border-slate-800 transition-all hover:shadow-sm border-slate-600 px-6 py-3 text-lg font-medium"
        >
          back to home
        </A>
      </div>
    </div>
  )
}

export default WorkTemplate
