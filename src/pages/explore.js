import React, { useEffect, useState } from "react"
import { graphql, StaticQuery } from "gatsby"
import SwipeableTextMobileStepper from "../components/carousel"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MediaQuery from "react-responsive"
import PostCard from "../components/postCard"
import ShoeCard from "../components/shoeCard"
import "font-awesome/css/font-awesome.min.css"
// import "../utils/global.scss"
import "./sandbox.css"
import "../utils/normalize.css"
import "../utils/css/screen.css"
import client from "../client"
import { fontSize } from "@material-ui/system"
const googleMap = require("../images/googleMap.png")

// import imageUrlBuilder from "@sanity/image-url"
//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template

const Explore = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const [logos, setLogos] = useState([])

  const [searchType, setSearchType] = useState(false)
  let postCounter = 0
  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    try {
      const vendors = await client.fetch(`
        *[_type == 'vendor']`)
      console.log("Fetched vendors", vendors)
      setLogos(vendors)
    } catch (e) {
      if (e !== "No current user") {
        alert(e)
      }
    }
    // setIsLoading(false);
  }

  console.log("EXplore logos: ", logos)
  return (
    <Layout title={siteTitle}>
      <SEO
        title="Explore our Brands"
        keywords={[`shoes`, `boots`, `seattle shoes`, `seattle boots`]}
      />

      <article className="post-content page-template no-image">
        <h2 id="dynamic-styles">Find peace for your sole</h2>
        <div className="post-content-body" class="row">
          <div className="post-feed">
            {searchType === true ? (
              <React.Fragment>
                {logos.map((logo, i) => {
                  postCounter++
                  return (
                    <ShoeCard
                      key={logo.name}
                      count={postCounter}
                      node={logo}
                      postClass={`post`}
                    />
                  )
                })}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {logos.map((logo, i) => {
                  postCounter++
                  return (
                    <PostCard
                      key={logo.name}
                      count={postCounter}
                      node={logo}
                      postClass={`post`}
                    />
                  )
                })}
              </React.Fragment>
            )}
          </div>
        </div>
      </article>

      {/* The code below has the brand images displayed, commented out due to client demand */}

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button onClick={() => setSearchType(true)}>View Shoes</button>
        <button onClick={() => setSearchType(false)}>View Brands</button>
      </div>
      <br />
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
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
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <Explore location={props.location} props data={data} {...props} />
    )}
  />
)
