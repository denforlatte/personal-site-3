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
  ],
}
