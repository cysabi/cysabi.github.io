import grid from "./static/grid.svg"

const Index = () => (
  <main class="relative">
    <div class="absolute z-10">
      <div class="py-24 max-w-5xl mx-auto">
        <div class="text-4xl">hey, i'm cerusabi</div>
        <div class="text-4xl">born to design, forced to develop</div>
      </div>
    </div>
    <div class="absolute z-0">
      <div>
        <img
          src={grid}
          style="mask-image: linear-gradient(#000, transparent);"
        />
      </div>
    </div>
  </main>
)

export default Index
