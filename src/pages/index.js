import React, { useEffect, useState } from "react"
import { graphql, StaticQuery } from "gatsby"
import SwipeableTextMobileStepper from "../components/carousel"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostCard from "../components/postCard"
import "font-awesome/css/font-awesome.min.css"
// import "../utils/global.scss"
import "../utils/normalize.css"
import "../utils/css/screen.css"
import client from "../client"
import imageUrlBuilder from "@sanity/image-url"
//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template

const BlogIndex = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  // const [logos, setLogos] = useState([])
  const [images, setImages] = useState([])
  let postCounter = 0
  useEffect(() => {
    onLoad()
  }, [])
  // async function onLoad() {
  //   try {
  //     const products = await client.fetch(`
  //       *[_type == 'vendor']`)
  //     console.log("testing 123", products)
  //     setLogos(products)
  //   } catch (e) {
  //     if (e !== "No current user") {
  //       alert(e)
  //     }
  //   }
  //   // setIsLoading(false);
  // }
  async function onLoad() {
    try {
      const products = await client.fetch(`
        *[_type == 'product']`)
      console.log("testing 123", products)
      setImages(products)
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
      {/* <Bio /> */}
      <SwipeableTextMobileStepper />
      {/* <DemoCarousel /> */}
      {/* {data.site.siteMetadata.description && (
        <header className="page-head">
          <h2 className="page-head-title">
            {data.site.siteMetadata.description}
          </h2>
        </header>
      )} */}
      <div className="post-feed">
        {/* {logos.map((logo, i) => {
          postCounter++
          return (
            <PostCard
              key={logo.slug.current}
              count={postCounter}
              node={logo}
              postClass={`post`}
            />
          )
        })} */}
        {images.map((image, i) => {
          console.log("Image:", image)
          postCounter++
          return (
            <PostCard
              key={image.slug.current}
              count={postCounter}
              node={image}
              postClass={`post`}
            />
          )
        })}
        {/* <div className="post-feed">
        {posts.map(({ node }) => {
          postCounter++
          return (
            <PostCard
              key={node.fields.slug}
              count={postCounter}
              node={node}
              postClass={`post`}
            />
          )
        })} */}
      </div>
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
