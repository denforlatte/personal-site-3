const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.sourceNodes = ({
  actions,
  getNodesByType,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

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
          orderedTags[tagIndex].totalCount++;
        } else {
          const tagClone = { ...tag };
          tagClone.projectCount = 1;
          tagClone.blogPostCount = 0;
          tagClone.totalCount = 1;
          orderedTags.push(tagClone);
        }
      });
    }
  });

  blogPosts.forEach(blogPost => {
    if (blogPost.tags) {
      blogPost.tags.forEach(tag => {
        const tagIndex = orderedTags.findIndex(t => t.name === tag.name);

        if (tagIndex > 0) {
          orderedTags[tagIndex].blogPostCount++;
          orderedTags[tagIndex].totalCount++;
        } else {
          const tagClone = { ...tag };
          tagClone.projectCount = 0;
          tagClone.blogPostCount = 1;
          tagClone.totalCount = 1;
          orderedTags.push(tagClone);
        }
      });
    }
  });

  // Create the GraphQL nodes for the tags
  orderedTags.forEach(tag => {
    const nodeContent = JSON.stringify(tag);

    const nodeMeta = {
      id: createNodeId(`strapi-tag-${tag.id}`),
      parent: null,
      children: [],
      internal: {
        type: `StrapiTag`,
        mediaType: `text/html`,
        content: nodeContent,
        contentDigest: createContentDigest(tag),
      },
    };

    const node = Object.assign({}, tag, nodeMeta);
    createNode(node);
  });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const PostPage = path.resolve("src/templates/PostPage/PostPage.js");
  const TagPage = path.resolve("src/templates/TagPage/TagPage.js");

  return graphql(`
    {
      allStrapiProject {
        edges {
          previous {
            title
            slug
          }
          node {
            title
            id
            slug
            is_published
          }
          next {
            title
            slug
          }
        }
      }
      allStrapiBlogPost {
        edges {
          previous {
            title
            slug
          }
          node {
            title
            id
            slug
            is_published
          }
          next {
            title
            slug
          }
        }
      }
      allStrapiTag {
        edges {
          node {
            slug
            id
            name
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) return Promise.reject(res.errors);

    const blogPosts = res.data.allStrapiBlogPost.edges;
    const projects = res.data.allStrapiProject.edges;
    const tags = res.data.allStrapiTag.edges;

    blogPosts.forEach(({ node, previous, next }) => {
      // TODO This just isn't working. Creates an issue if the nodes are still there.
      if (node.is_published || process.env.NODE_ENV === "development") {
        createPage({
          path: `blog/${node.slug}`,
          component: PostPage,
          context: {
            previous: previous,
            id: node.id,
            next: next,
          },
        });
      }
    });

    projects.forEach(({ node, previous, next }) => {
      // TODO This just isn't working. Creates an issue if the nodes are still there.
      if (node.is_published || process.env.NODE_ENV === "development") {
        createPage({
          path: `projects/${node.slug}`,
          component: PostPage,
          context: {
            previous: previous,
            id: node.id,
            next: next,
          },
        });
      }
    });

    tags.forEach(({ node }) => {
      createPage({
        path: `tags/${node.slug}`,
        component: TagPage,
        context: {
          slug: node.slug,
          name: node.name,
        },
      });
    });
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error

  // TODO remove references to markdown
  createTypes(`
  type StrapiBlogPost implements Node {
    body: [body]
    publishedAt: String
  }

  type StrapiProject implements Node {
    body: [body]
    publishedAt: String
  }
  
  type body {
    text: String
    paginationPage: [page]
  }

  type page {
    text: String
    title: String
  }
  `);
};

// This hides the frustrating css import order warning that isn't really relevant.
// See https://github.com/facebook/create-react-app/issues/5372#issuecomment-685932009
exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === 'develop' || stage === 'build-javascript') {
    const config = getConfig()
    const miniCssExtractPlugin = config.plugins.find(
      plugin => plugin.constructor.name === 'MiniCssExtractPlugin'
    )
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true
    }
    actions.replaceWebpackConfig(config)
  }
};
