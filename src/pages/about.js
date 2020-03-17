import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../utils/normalize.css"
import "../utils/css/screen.css"
const storeFront = require("../images/bench-accounting-49909-unsplash.jpg")
const AboutPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  return (
    <Layout title={siteTitle}>
      <SEO title="About" keywords={[`uw`, `foot-wear`, `shoes`, `leather`]} />
      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h3 id="clean-minimal-and-deeply-customisable-london-is-a-theme-made-for-people-who-appreciate-simple-lines-">
            Locally owned for over 40 years, specializing in comfortable, high
            quality, good-looking shoes and excellent customer service.
          </h3>
          <React.Fragment>
            <div className="retro" id="container">
              <img
                src={storeFront}
                alt="logo"
                width="800px"
                height="300px"
                margin-left="auto"
                margin-right="auto"
              />
            </div>
          </React.Fragment>
          <p>
            The Woolly Mammoth is known for brand-name comfortable, casual &
            rugged footwear for the family. We invite you to come to our store
            in the University District, and try on our upcoming spring
            collection. Our staff work with you to make sure that you are
            comfortable & healthy in your shoes - many of our customers are
            working on their feet all day, ranging from nurses to construction
            professionals. It has been our families passion to serve the Seattle
            area for over 40 years, and we look forward to welcoming you to our
            store.
          </p>
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
      <AboutPage location={props.location} data={data} {...props} />
    )}
  />
)
