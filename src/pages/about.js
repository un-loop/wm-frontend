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
          <br />
          <p>
            The Woolly Mammoth was established in Seattle’s University District
            in 1970 by Pat Andre as a custom leather shop. Since then, the store
            has evolved into Seattle’s premium comfort shoe store. Pat’s
            daughter Matthea now runs the shop with the help of her sister
            Japhet and long-time family friend and employee Heather.
          </p>
          <p>
            The Woolly Mammoth is a well-known Seattle icon, providing top of
            the line footwear and accessories for men and women, suitable for
            the Northwest lifestyle.
          </p>
          <p>
            Please take a look around our website to discover more about The
            Woolly Mammoth and to browse the wide variety of products we offer.
            Then come in and visit our one-of-kind store to find the perfect
            pair of shoes for you. With hundreds of choices in styles, excellent
            customer service, and a convenient and central location – shopping
            couldn’t be more rewarding or more enjoyable.
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
