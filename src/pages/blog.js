import React, { useEffect, useState } from "react"

import { graphql, StaticQuery } from "gatsby"
// import Img from "gatsby-image"
import client from "../client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BlockContent from "@sanity/block-content-to-react"
import "../utils/normalize.css"
import "../utils/css/screen.css"

const BlogPage = ({ data }, location) => {
  // console.log(data)
  const siteTitle = data.site.siteMetadata.title
  // const posts = data.allMarkdownRemark.edges
  // let postCounter = 0
  const [blogs, setBlogs] = useState([])
  // const serializers = {
  //   types: {
  //     code: props => (
  //       <pre data-language={props.node.language}>
  //   <code>{props.node.code}</code>
  //       </pre>
  //     )
  //   }
  // }

  useEffect(() => {
    onLoad()
  }, [])
  async function onLoad() {
    try {
      const blogs = await client.fetch(`
        *[_type == 'blog']{
          title, images, author, created, blog}`)

      // console.log("testing 123", blogs)
      setBlogs(blogs)
    } catch (e) {
      if (e !== "No current user") {
        alert(e)
      }
    }
    // setIsLoading(false);
  }
  const mystyle = {
    borderRadius: "25px",
    boxShadow: "2px 2px 15px grey",
    border: "1px solid grey",
    padding: 10,
    marginTop: 30,
    marginBottom: 40,
    paddingLeft: 30,
  }
  return (
    <Layout title={siteTitle}>
      <SEO title="Blog" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />

      <article className="post-content page-template no-image">
        {/* <div className="post-content-body">
          <h2 id="clean-minimal-and-deeply-customisable-london-is-a-theme-made-for-people-who-appreciate-simple-lines-" />
          <figure className="kg-card kg-image-card kg-width-full">
            <img
              src="https://wm-photos.s3.amazonaws.com/herschelMix.jpg"
              alt=""
              align="middle"
            />
            <figcaption>Hershal</figcaption>
          </figure> */}

        <h3>Blog Post</h3>
        {blogs.map((blog, i) => {
          console.log(blog)
          return (
            <div style={mystyle}>
              <h4 style={{ paddingLeft: 15 }}>{blog.title}</h4>
              <BlockContent
                blocks={blog.blog}
                image={blog.image}
                projectId="v8vntiu0"
                dataset="production"
              />
            </div>
          )
        })}
        {/* </div> */}
      </article>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    benchAccounting: file(
      relativePath: { eq: "bench-accounting-49909-unsplash.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1360) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <BlogPage location={props.location} data={data} {...props} />
    )}
  />
)
