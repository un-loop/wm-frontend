import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const AboutPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout title={siteTitle}>
      <SEO
        title="Contact"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />

      <article className="post-content page-template no-image">
        <h3 id="dynamic-styles">Call Us for Superior Service</h3>
        <div className="post-content-body" class="row">
          <div class="col-6">
            <div class="body-text-2">Telephone:(206)632-3254</div>
            <div class="body-text-2">Fax:(206)545-3814</div>
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
        </div>
      </article>
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
            <div class="body-text-2">Sunday 12:00 to 7:00</div>
          </div>
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
