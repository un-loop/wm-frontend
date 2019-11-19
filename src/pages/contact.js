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
        <div className="post-content-body">
          <h3 id="dynamic-styles">Call Us for Superior Service</h3>
          <div class="column-50 left">
            <div class="body-text-2">Telephone:(206)632-3254</div>
            <div class="body-text-2">Fax:(206)545-3814</div>
            <a
              href="mailto:info@woollymammothshoes.com"
              class="body-text-2 link"
            >
              info@woollymammothshoes.com
            </a>
          </div>
          <div class="column-50 right">
            <div class="body-text-2">4303 University Way NE</div>
            <div class="body-text-2">Seattle, WA 98105</div>
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
