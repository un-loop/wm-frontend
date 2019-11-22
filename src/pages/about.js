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
          {/* <figure className="kg-card kg-image-card kg-width-full">
            <Img
              src={storeFront}
              fluid={data.benchAccounting.childImageSharp.fluid}
              className="kg-image"
            />
            <figcaption>Large imagery is at the heart of this theme</figcaption>
          </figure> */}
          {/* <h3 id="dynamic-styles"></h3> */}
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
            Seattle shoppers in search of comfortable, functional and
            fashionable footwear look no further. Where comfort meets fashion is
            the motto here. Our store is a unique, service-oriented store where
            you will find everything for your running & walking needs! A fun and
            affordable shoe boutique. Quality brands from the United States,
            Europe, and all over the world, our staff will measure your feet for
            a proper fit and maximum comfort. While womens shoes predominate,
            the shop carries a good selection of high-end mens footwear,
            predominately Italian. We look forward to providing you with
            footwear that can ease your aches or just give you the ultimate in
            comfort. We carry all best name brands: dickies, levis, nike, vans,
            converse, puma, adidas, reebok, dc, globe, caterpillar, work zone,
            k-swiss, fila, LRG, wink, proclub, shaka etc... We provide an array
            of footwear including sneakers, boots, fashion shoes, and a strong
            mix of comfort to give our customers the quality they deserve at
            prices they can afford. We can also help kids feet feel better and
            be better supported. This local downtown shoe store strives to
            deliver personal customer service and our experienced staff can not
            wait to help you find the right shoe, the right style, and a proper
            fit. Our staff will help you find shoes for any occasion!
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
