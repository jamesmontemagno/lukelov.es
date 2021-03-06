const path = require("path")
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

const production = process.env.NODE_ENV === "production"

const stringifyGraphql = (obj) => {
  let stringified = JSON.stringify(obj).replace(/"([^"]+)":/g, "$1:")

  if (stringified.startsWith("{")) {
    stringified = stringified.replace(/^{/, "").replace(/}$/, "")
  }

  return stringified
}

const filterDrafts = (opts) =>
  _.merge(
    opts ? { filter: opts } : {},
    production
      ? {
          filter: {
            fields: {
              draft: {
                eq: false,
              },
            },
          },
        }
      : {}
  )

const createPostPages = ({ actions, posts }) => {
  posts.forEach((post) => {
    actions.createPage({
      path: post.fields.slug,
      component: path.resolve(`src/templates/post.js`),
      context: { slug: post.fields.slug },
    })
  })
}

const createTagPages = ({ actions, posts }) => {
  posts
    .reduce(
      (acc, post) =>
        post.frontmatter.tags.reduce((acc, tag) => acc.add(tag), acc),
      new Set()
    )
    .forEach((tag) => {
      actions.createPage({
        path: `/tags/${tag}`,
        component: path.resolve(`src/templates/postListing.js`),
        context: {
          title: `Tag: ${tag}`,
          ...filterDrafts({
            frontmatter: { tags: { in: [tag] } },
          }),
        },
      })
    })
}

const createListingPages = ({ actions, posts, limit = 100 }) => {
  const totalPages = Math.ceil(posts.length / limit)
  Array.from({ length: totalPages }).forEach((_, i) => {
    const currentPage = i + 1
    actions.createPage({
      path: currentPage === 1 ? "/" : `/page${currentPage}`,
      component: path.resolve(`src/templates/postListing.js`),
      context: {
        title: currentPage === 1 ? "Home" : `Page ${currentPage}`,
        limit,
        skip: i * limit,
        totalPages,
        currentPage,
        ...filterDrafts(),
      },
    })
  })

  actions.createPage({
    path: `/full`,
    component: path.resolve(`src/templates/postListing.js`),
    context: {
      title: `All Posts`,
      ...filterDrafts(),
    },
  })
}

const createPostFields = ({ actions, node, getNode }) => {
  const { createNodeField } = actions

  const filename = createFilePath({ node, getNode })

  node.frontmatter.tags = Array.isArray(node.frontmatter.tags)
    ? node.frontmatter.tags.map((t) => t.replace(/\s/g, "-"))
    : []

  createNodeField({ node, name: `slug`, value: `/articles${filename}` })
  createNodeField({
    node,
    name: "draft",
    value: node.frontmatter.draft ?? false,
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const results = await graphql(`
    query {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        ${stringifyGraphql(filterDrafts())}
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `)

  if (results.errors) {
    reporter.panicOnBuild(`Error while running allMarkdownRemark query`)
    return
  }

  const posts = results.data.allMarkdownRemark.edges.map(({ node }) => node)
  createListingPages({ actions, posts })
  createTagPages({ actions, posts })
  createPostPages({ actions, posts })
}

exports.onCreateNode = ({ node, ...rest }) => {
  if (node.internal.type === `MarkdownRemark`) {
    createPostFields({ node, ...rest })
  }
}
