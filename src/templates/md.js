import React from "react"
import Layout from "src/components/Layout"

const Post = ({ pageContext, children }) => {
  return <Layout pageTitle={pageContext.frontmatter.title}>{children}</Layout>
}

export default Post
