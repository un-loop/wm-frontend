import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { graphql, StaticQuery } from "gatsby"
// import Img from "gatsby-image"
import orderBy from "lodash.orderby"
import client from "../client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BlockContent from "@sanity/block-content-to-react"
import "../utils/normalize.css"
import "../utils/css/screen.css"

const BrandsPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    onLoad()
  }, [])
  async function onLoad() {
    try {
      const blogs = await client.fetch(`
        *[_type == 'vendor']{
          title, images, visible, slug}`)

      let orderedBrands = orderBy(blogs, ["title"], ["asc"])
      setBlogs(orderedBrands)
    } catch (e) {
      if (e !== "No current user") {
        alert(e)
      }
    }
  }
  const mystyle = {
    padding: 10,
    color: "black",
    fontSize: 30,
    paddingLeft: 10,
  }
  return (
    <Layout title={siteTitle}>
      <SEO title="Blog" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <article className="post-content page-template no-image">
        <h1>Woolly Mammoth Brands</h1>
        {blogs.map((blog, i) => {
          return (
            <React.Fragment>
              {blog.visible === "visible" ? (
                <div style={mystyle}>
                  <Link style={{ color: "black" }} to={`/${blog.slug.current}`}>
                    {blog.title}
                  </Link>
                </div>
              ) : null}
            </React.Fragment>
          )
        })}
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
      <BrandsPage location={props.location} data={data} {...props} />
    )}
  />
)
