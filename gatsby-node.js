const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

}

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions
// }

exports.sourceNodes = ({ actions, getNodesByType, createNodeId, createContentDigest }) => {
  const { createNode } = actions

  const projects = getNodesByType("StrapiProject");
  const blogPosts = getNodesByType("StrapiBlogPost");
  const orderedTags = [];

  // Populate array of tags, counting how many times they are used
  projects.forEach(project => {
    if (project.tags) {
      project.tags.forEach(tag => {
        const tagIndex = orderedTags.findIndex(t => t.name === tag.name);

        if (tagIndex > 0) {
          orderedTags[tagIndex].projectCount++;
        } else {
          const tagClone = {...tag};
          tagClone.projectCount = 1
          tagClone.blogPostCount = 0;
          orderedTags.push(tagClone);
        }
      })
    }
  })

  blogPosts.forEach(blogPost => {
    if (blogPost.tags) {
      blogPost.tags.forEach(tag => {
        const tagIndex = orderedTags.findIndex(t => t.name === tag.name);

        if (tagIndex > 0) {
          orderedTags[tagIndex].blogPostCount++;
        } else {
          const tagClone = {...tag};
          tagClone.projectCount = 0
          tagClone.blogPostCount = 1;
          orderedTags.push(tagClone);
        }
      })
    }
  })

  // Create the GraphQL nodes for the tags
  orderedTags.forEach(tag => {
    const nodeContent = JSON.stringify(tag)

    const nodeMeta = {
      id: createNodeId(`strapi-tag-${tag.id}`),
      parent: null,
      children: [],
      internal: {
        type: `StrapiTag`,
        mediaType: `text/html`,
        content: nodeContent,
        contentDigest: createContentDigest(tag)
      }
    }

    const node = Object.assign({}, tag, nodeMeta)
    createNode(node)
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error

  // TODO remove references to markdown
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
