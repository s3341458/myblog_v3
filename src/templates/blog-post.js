import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import { publicClient } from "../utils/client"

import gql from "graphql-tag"
import { Query } from "react-apollo"

import Comment from "../components/comment"
import CommentForm from "../components/CommentForm"

import { connect } from "react-redux"
import { listComments } from "../graphql/queries"


class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const currentPath = post.fields.slug.replace(/\//g, "")
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <header>
            <h1
              style={{
                marginTop: rhythm(1),
                marginBottom: 0,
              }}
            >
              {post.frontmatter.title}
            </h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
              }}
            >
              {post.frontmatter.date}
            </p>
          </header>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: rhythm(1),
            }}
          />
          <footer>
            <div style={{ margin: "10px 0 60px 0" }}>
              <h3>Comments:</h3>
              <Query
                query={gql(listComments)}
                client={publicClient}
                pollInterval={1000}
                variables={{ filter: { postPath: { eq: currentPath } } }}
              >
                {({ loading, error, data }) => {
                  if (loading) {
                    return <div>Loading...</div>
                  }
                  if (error) {
                    console.error(error)
                    return <div>Error!</div>
                  }
                  const comments = data.listComments.items
                  return comments.length <= 0 ? (
                    <div>No comments</div>
                  ) : (
                    <ul>
                      {comments.map(comment => (
                        <li key={comment.timestamp}>
                          <Comment comment={comment} />
                        </li>
                      ))}
                    </ul>
                  )
                }}
              </Query>
              <CommentForm currentPath={this.props.location.pathname} />
            </div>
            <Bio />
          </footer>
        </article>
        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`

//export default BlogPostTemplate;

export default connect(
  state => ({ logined: state.auth.logined }),
  null
)(BlogPostTemplate)
