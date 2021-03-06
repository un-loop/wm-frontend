import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../utils/normalize.css"
import "../utils/css/screen.css"
import { fontSize } from "@material-ui/system"
const googleMap = require("../images/googleMap.png")
const AboutPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  return (
    <Layout title={siteTitle}>
      <SEO
        title="Contact"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      <article className="post-content page-template no-image">
        <h3 id="dynamic-styles">Please Contact Us</h3>
        <h6>
          To redeem gift cards & make purchases over the phone, call (206)
          851-9141
        </h6>
        <div className="post-content-body" class="row">
          <div class="col-6">
            <div class="body-text-2">Telephone: (206) 632-3254</div>
            <div class="body-text-2">Fax: (206) 545-3814</div>
            <a
              href="mailto:info@woollymammothshoes.com"
              class="body-text-2 link"
            >
              info@woollymammothshoes.com
            </a>
            <div class="w-100" />
          </div>
          <div class="col-6">
            <div class="body-text-2">4303 University Way NE</div>
            <div class="body-text-2">Seattle, WA 98105</div>
          </div>

          <div>
            <div class="body-text-2">
              <img src={googleMap} alt="map" width="2300px" height="400px" />
            </div>
            <div>
              <div style={{ fontSize: "20pt", marginTop: 20 }}>
                We offer parking validation for any of the UDPA lots.
              </div>
            </div>
          </div>
        </div>
        <article className="post-content page-template no-image">
          <h3 id="dynamic-styles">Stop By and See Us</h3>
          <div className="post-content-body" class="row">
            <div class="col-6">
              <div class="body-text-2" />
              <div class="body-text-2">Monday 10:00 to 7:00</div>
              <div class="body-text-2">Tuesday 10:00 to 7:00</div>
              <div class="body-text-2">Wednesday 10:00 to 7:00</div>
              <div class="body-text-2">Thursday 10:00 to 7:00</div>
              <div class="body-text-2">Friday 10:00 to 7:00</div>
              <div class="w-100" />
            </div>
            <div class="col-6">
              <div class="body-text-2">Satuday 10:00 to 6:00</div>
              <div class="body-text-2">Sunday 12:00 to 6:00</div>
            </div>
          </div>
        </article>
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
