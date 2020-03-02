import React, { useEffect, useState } from "react"
import { graphql, StaticQuery } from "gatsby"
import SwipeableTextMobileStepper from "../components/carousel"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import PostCard from "../components/postCard"
// import ShoeCard from "../components/shoeCard"
import "font-awesome/css/font-awesome.min.css"
// import "../utils/global.scss"
import "../utils/normalize.css"
import "../utils/css/screen.css"
import client from "../client"
// import imageUrlBuilder from "@sanity/image-url"
//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template

const BlogIndex = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const [logos, setLogos] = useState([])
  // false means view brands, true means shoes
  const [searchType, setSearchType] = useState(false)
  let postCounter = 0
  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    try {
      const vendors = await client.fetch(`
        *[_type == 'vendor']`)
      // console.log("Fetched vendors", vendors)
      setLogos(vendors)
    } catch (e) {
      if (e !== "No current user") {
        alert(e)
      }
    }
    // setIsLoading(false);
  }
  return (
    <Layout title={siteTitle}>
      <SEO title="Home" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <SwipeableTextMobileStepper />
      <br />

      {/* The code below has the brand images displayed, commented out due to client demand */}

      {/* <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button onClick={() => setSearchType(true)}>View Shoes</button>
        <button onClick={() => setSearchType(false)}>View Brands</button>
      </div> */}
      <br />

      {/* <div className="post-feed">
        {searchType === true ? (
          <React.Fragment>
            {logos.map((logo, i) => {
              postCounter++
              return (
                <ShoeCard
                  key={logo.slug.current}
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
                  key={logo.slug.current}
                  count={postCounter}
                  node={logo}
                  postClass={`post`}
                />
              )
            })}
          </React.Fragment>
        )}
      </div> */}
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
      <BlogIndex location={props.location} props data={data} {...props} />
    )}
  />
)
