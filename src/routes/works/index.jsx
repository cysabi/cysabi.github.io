import * as work4 from "./block-sumo.mdx"
import * as work5 from "./blurple-py.mdx"
import * as work3 from "./cg-fabl.mdx"
import * as work2 from "./cg-pass-the-clam.mdx"
import * as work7 from "./cq-overlays.mdx"
import * as work1 from "./off-the-dial-site.mdx"
import * as work8 from "./radia.mdx"
import * as work6 from "./social-scheduler.mdx"

const Works = () => (
  <div>
    {/* <ProjectOrb
        wip={true}
        layer="2"
        coords={[2, 1]}
        name="off-the-dial-bot"
this is the origin story or blurple
the team name generator was really cool :D
talk about the CommandUI component
and the file-routing discord.py
there honestly should be a lot in here to talk about
Automatically detects the relevant tournament and makes an API request to grab attendees from the tournament website; tags attendees accordingly
Features include managing the creation of tournaments, organizing signups, dropouts, and substitutes, creating maplists, building data to import into broadcast graphics.
Used Python, Discord.py, Firebase, GraphQL, REST.
      /> */}
    {/* <ProjectOrb wip={true} layer="2" coords={[5, 4]} name="fabl-website" />
Custom website to introduce the information and showcase the standings for FABL, a major tournament event.
gets api stuff from standings page
    */}
    {/* <ProjectOrb wip={true} layer="2" coords={[5, 4]} name="cg-offthedial" />
Stream overlays for tournaments hosted by Off the Dial. Solo project
from design to development. Uses NodeCG, Preact, and Tailwind.
    */}
  </div>
)

export const works = [work1, work2, work3, work4, work5, work6, work7, work8]
export default Works
