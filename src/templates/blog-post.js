import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import client from "../client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import myConfiguredSanityClient from "../client"
import imageUrlBuilder from "@sanity/image-url"
import { Button, ButtonToolbar } from "react-bootstrap"
import "../utils/css/components/global.css"
// import "bootstrap/dist/css/bootstrap.min.css"
import ProductDisplay from "../components/ProductDisplay"
const builder = imageUrlBuilder(myConfiguredSanityClient)

class BlogPostTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      brands: [],
      addModalShow: false,
      showBig: false,
      openingIndex: 0,
    }
  }
  async componentDidMount() {
    const brand = window.location.pathname.split("/")
    try {
      const result = await client.fetch(
        `*[_type == 'product' && vendorTitle == '${brand[1]}']`
      )
      this.setState({ brands: result })
    } catch (e) {
      console.log("Sanity fetch", e)
    }
  }

  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    let addModalClose = () => this.setState({ addModalShow: false })
    console.log(this.state.openingIndex)
    return (
      <div>
        <Layout location={this.props.location} title={siteTitle}>
          <SEO
            title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}
          />

          <article
            className={`post-content ${post.frontmatter.thumbnail ||
              `no-image`}`}
          >
            <header className="post-content-header">
              <h1 className="post-content-title">{post.frontmatter.title}</h1>
            </header>
            {post.frontmatter.description && (
              <p className="post-content-excerpt">
                {post.frontmatter.description}
              </p>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flex: "0 1 24%",
                flexWrap: "wrap",
              }}
            >
              {this.state.brands.map((brand, index) => {
                function urlFor(_ref) {
                  return builder.image(_ref)
                }
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "wrap",
                      flex: "0 1 24%",
                    }}
                    onClick={() =>
                      this.setState({ addModalShow: true, openingIndex: index })
                    }
                  >
                    <img
                      src={urlFor(
                        brand.defaultProductVariant.images[0].asset._ref
                      )
                        .width(200)
                        .url()}
                    />
                    <p>{brand.title}</p>
                  </div>
                )
              })}
            </div>

            <ProductDisplay
              show={this.state.addModalShow}
              onHide={addModalClose}
              brands={this.state.brands}
              openingIndex={this.state.openingIndex}
            />

            {post.frontmatter.thumbnail && (
              <div className="post-content-image">
                <Img
                  className="kg-image"
                  fluid={post.frontmatter.thumbnail.childImageSharp.fluid}
                  alt={post.frontmatter.title}
                />
              </div>
            )}

            <div
              className="post-content-body"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            <footer className="post-content-footer">
              {/* There are two options for how we display the byline/author-info.
        If the post has more than one author, we load a specific template
        from includes/byline-multiple.hbs, otherwise, we just use the
        default byline. */}
            </footer>
          </article>
        </Layout>
      </div>
    )
  }
}

export default BlogPostTemplate

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
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 1360) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
