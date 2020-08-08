const path = require("path")

module.exports = {
  siteMetadata: {
    title: `Lepto.Tech`,
    description: `Off the Dial is a unique tournament organisation for Splatoon 2, dedicated to providing fresh tournament opportunities for free agents and teams alike.`,
  },
  plugins: [
    /* Filesystem stuff */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
        ignore: `../**/blog/**`, // Except blog
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/pages/blog`,
      },
    },

    /* Utilities */
    `gatsby-plugin-root-import`,
    `gatsby-plugin-remove-trailing-slashes`,

    /* Styles & CSS */
    `gatsby-plugin-sass`,

    /* Image Processing */
    `gatsby-plugin-sharp`,

    /* MDX */
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: path.resolve("src/templates/md.js"),
          blog: path.resolve("src/templates/blogpost.js"),
        },
        gatsbyRemarkPlugins: [
          `gatsby-remark-images`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
            },
          },
        ],
        remarkPlugins: [require(`remark-emoji`), require(`remark-twemoji`)],
      },
    },
  ],
}
