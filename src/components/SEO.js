import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import { Helmet } from "react-helmet"
import favicon from "~/src/static/favicon.svg"

const SEO = ({ title }) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
          }
        }
      }
    `
  )

  const metaTitle = title
    ? `${title} - ${siteMetadata.title}`
    : siteMetadata.title

  return (
    <Helmet htmlAttributes={{ lang: "en" }}>
      <title>{metaTitle}</title>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:url" content={siteMetadata.siteUrl} />
      <meta name="theme-color" content="#4eb3d3" />
      <link rel="icon" type="image/png" sizes="64x64" href={favicon} />
    </Helmet>
  )
}

export default SEO
