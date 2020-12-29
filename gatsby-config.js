require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Danny Thobjørn Wilkins`,
    author: {
      name: `Danny Thobjørn Wilkins`,
      summary: `Software engineer from England.`,
    },
    description: `A website for me to share whatever projects I've been working on.`,
    siteUrl: `https://dannywilkins.me`,
    social: {
      twitter: `denforlatte`,
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-strapi',
      options: {
        apiURL: process.env.STRAPI_HOST,
        queryLimit: 1000,
        contentTypes: [
          // List of the Content Types you want to be able to request from Gatsby.
          'blog-post',
          'project',
        ],
        singleTypes: [
          'about'
        ],
        // Possibility to login with a strapi user, when content types are not publically available (optional).
        loginData: {
          identifier: process.env.STRAPI_USERNAME, // Username in Strapi
          password: process.env.STRAPI_PASSWORD,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: `images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
  ],
}
