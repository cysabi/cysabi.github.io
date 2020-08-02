import React from "react"
import Layout from "src/components/Layout"

const Post = ({ pageContext, children }) => (
  <Layout pageTitle={pageContext.frontmatter.title}>
    <div class="section pt-0">
      <div class="container">{children}</div>
    </div>
  </Layout>
)

export default Post
