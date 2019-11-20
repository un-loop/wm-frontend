import React, { useEffect, useState } from "react"
import { graphql, StaticQuery } from "gatsby"
// import Img from "gatsby-image"
import client from "../client"
import Layout from "../components/layout"
import SEO from "../components/seo"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const BlogPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  // const posts = data.allMarkdownRemark.edges
  // let postCounter = 0
  const [blogs, setBlogs] = useState([])

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

  // function displayBlog() {
  //   document.getElementById("blog").innerHTML =
  //   blog.map(blog);
  // }

  return (
    <Layout title={siteTitle}>
      <SEO title="Blog" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />

      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h2 id="clean-minimal-and-deeply-customisable-london-is-a-theme-made-for-people-who-appreciate-simple-lines-" />
          <figure className="kg-card kg-image-card kg-width-full">
            <img
              src="https://wm-photos.s3.amazonaws.com/herschelMix.jpg"
              alt=""
              align="middle"
            />
            <figcaption>Hershal</figcaption>
          </figure>
          <h3>Blog Post</h3>
          {blogs.map((blog, i) => {
            return <p>{blog.title} </p>
          })}
        </div>
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
