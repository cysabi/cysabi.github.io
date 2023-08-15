import { createSignal, onMount } from "solid-js"
import { useGrid } from "../components/grid"

const Contact = () => {
  let formRef
  const [talk, setTalk] = createSignal("")
  const [done, setDone] = createSignal(false)
  const { setColor } = useGrid()
  onMount(() => {
    setColor("#4e918d")
  })

  return (
    <div class="flex flex-col gap-12 max-w-7xl h-screen mx-auto p-[min(10vw,128px)]">
      <div class="flex flex-col gap-2">
        <div class="text-4xl font-medium">like what you see? let's talk!</div>
        <div class="text-3xl text-slate-300">
          got a project with me in mind? share it with me!
        </div>
      </div>
      <form
        ref={formRef}
        class="flex flex-col gap-4"
        target="dummyframe"
        method="POST"
        action="https://formsubmit.io/send/leptoflare@gmail.com"
        onsubmit={() => setDone(true)}
      >
        <input
          onchange={e => setTalk(e.currentTarget.value)}
          placeholder="what do you prefer to go by?"
          name="name"
          type="text"
          autocomplete="off"
          required
        />
        <input
          placeholder="what's your email?"
          name="email"
          type="email"
          autocomplete="off"
          required
        />
        <textarea
          class="resize-none"
          placeholder={`hey ${talk() || "there"}! what would you like to say?`}
          name="comment"
          required
          rows="5"
        ></textarea>
        <div class="flex justify-center p-4">
          {done() ? (
            <div class="text-xl font-medium">
              thanks for sharing! i'll get back to you as soon i can
            </div>
          ) : (
            <button
              class="text-2xl font-semibold underline decoration-2 decoration-transparent hover:decoration-slate-400 transition-colors"
              value="submit"
              type="submit"
            >
              send message
            </button>
          )}
        </div>
        <input
          name="_formsubmit_id"
          type="text"
          style="display:none"
          autocomplete="off"
        />
      </form>
      <iframe name="dummyframe" id="dummyframe" style="display: none;"></iframe>
    </div>
  )
}
export default Contact
