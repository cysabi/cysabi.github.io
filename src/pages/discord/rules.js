import React from "react"

import Layout from "src/components/Layout"
import Heading from "src/components/Heading"

const Index = () => (
  <Layout pageTitle="Hey, I'm LeptoFlare">
    <div class="section container">
      <Heading>Discord Rules</Heading>
      <ul>
        <li>Be mature and respectful.</li>
        <li>Follow the Discord community guidelines.</li>
        <li>Keep display names simple.</li>
        <li>No NSFW material, links, references, or images.</li>
        <li>
          Moderators are granted the right to kick / ban you however they see
          fit.
        </li>
        <li>Any disputes should be taken to moderators.</li>
        <li>Appeals should be taken to another moderator.</li>
        <li>Do not contact roots/developers directly.</li>
        <li>
          For more serious support, such as abuse, you can contact Discord
          directly.
        </li>
      </ul>
    </div>
  </Layout>
)

export default Index
