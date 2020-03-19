import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { graphql, StaticQuery } from "gatsby"
// import Img from "gatsby-image"
import client from "../client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BlockContent from "@sanity/block-content-to-react"
import "../utils/normalize.css"
import "../utils/css/screen.css"

const BrandsPage = ({ data }, location) => {
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
        *[_type == 'vendor']{
          title, images, author, created, blog, slug}`)

      console.log("testing 123", blogs)
      setBlogs(blogs)
    } catch (e) {
      if (e !== "No current user") {
        alert(e)
      }
    }
    // setIsLoading(false);
  }
  const mystyle = {
    // borderRadius: "25px",
    // boxShadow: "2px 2px 15px grey",
    // border: "1px solid grey",
    padding: 10,
    color: "black",
    fontSize: 30,
    // marginTop: 30,
    // marginBottom: 40,
    paddingLeft: 10,
  }
  return (
    <Layout title={siteTitle}>
      <SEO title="Blog" keywords={[`blog`, `gatsby`, `javascript`, `react`]} />
      <article className="post-content page-template no-image">
        <h1>Woolly Mammoth Brands</h1>
        {blogs.map((blog, i) => {
          console.log(blog)
          return (
            <div style={mystyle}>
              <Link style={{ color: "black" }} to={`/${blog.slug.current}`}>
                {blog.title}
              </Link>
            </div>
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
