require("dotenv").config();

// We want to get the unpublished blogs if we're in dev mode
const query = process.env.NODE_ENV === "development" ? {} : ({
  _sort: 'published_date:desc',
  is_published: 'true',
})

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
      twitter: `denforlatte`, // TODO expand
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        cssLoaderOptions: {
          esModule: false,
          modules: {
            namedExport: false,
          },
        },
      },
    },
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.STRAPI_HOST,
        queryLimit: 1000,
        collectionTypes: [
          // List of the Content Types you want to be able to request from Gatsby.
          {
            name: 'blog-post',
            api: {
              qs: query
            }
          },        {
            name: 'project',
            api: {
              qs: query
            }
          }
        ],
        singleTypes: ["about"],
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
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          placeholder: `tracedSVG`,
          backgroundColor: `transparent`,
        }
      }
    },
    `gatsby-transformer-sharp`,
    //`gatsby-plugin-feed`, for an RSS feed. May need to re-add markdown remark
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-image`,
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        // TODO do I want to add a search of the body?
        fields: [`title`, `summary`],
        resolvers: {
          StrapiProject: {
            title: node => node.title,
            summary: node => node.summary,
            path: node => `/projects/` + node.slug,
            thumbnail: node => node.thumbnail,
            tags: node => node.tags,
            published_date: node => node.published_date,
          },
          StrapiBlogPost: {
            title: node => node.title,
            summary: node => node.summary,
            path: node => `/blog/` + node.slug,
            thumbnail: node => node.thumbnail,
            tags: node => node.tags,
            published_date: node => node.published_date,
          },
        },
        // Optional filter to limit indexed nodes
        // filter: (node, getNode) => node.frontmatter.tags !== "exempt",
      },
    },
  ],
};
