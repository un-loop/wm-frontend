import React, { useEffect, useState } from "react"

import { graphql, StaticQuery } from "gatsby"
// import Img from "gatsby-image"
import client from "../client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BlockContent from "@sanity/block-content-to-react"
import "../utils/normalize.css"
import "../utils/css/screen.css"

const Legacy = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    onLoad()
  }, [])
  async function onLoad() {
    try {
      const blogs = await client.fetch(`
        *[_type == 'legacy']{
          title, images, author, created, blog}`)

      setBlogs(blogs)
    } catch (e) {
      if (e !== "No current user") {
        alert(e)
      }
    }
    // setIsLoading(false);
  }
  return (
    <Layout title={siteTitle}>
      <SEO title="Blog" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />

      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h2 id="clean-minimal-and-deeply-customisable-london-is-a-theme-made-for-people-who-appreciate-simple-lines-" />
          {blogs.map((blog, i) => {
            return (
              <div>
                <h1 style={{ paddingLeft: 15 }}>{blog.title}</h1>
                <BlockContent
                  blocks={blog.blog}
                  image={blog.image}
                  projectId="v8vntiu0"
                  dataset="production"
                />
              </div>
            )
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
    render={data => <Legacy location={props.location} data={data} {...props} />}
  />
)
