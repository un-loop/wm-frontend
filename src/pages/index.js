import React, { useEffect, useState } from "react"
import { graphql, StaticQuery } from "gatsby"
import SwipeableTextMobileStepper from "../components/carousel"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MediaQuery from "react-responsive"
import Button from "@material-ui/core/Button"
import { Link } from "gatsby"
import "font-awesome/css/font-awesome.min.css"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import "./sandbox.css"
import PostCard from "../components/postCard"
import ShoeCard from "../components/shoeCard"
import imageUrlBuilder from "@sanity/image-url"
import orderBy from "lodash.orderBy"
import "../utils/normalize.css"
import "../utils/css/screen.css"
import client from "../client"
const googleMap = require("../images/googleMap.png")
const streets = require("../images/signpost.jpeg")

const useStyles = makeStyles(theme => ({
  root: {
    color: "white",
  },
  button: {
    fontColor: "white",
    backgroundColor: "black",
    color: "white",
  },
}))

const BlogIndex = ({ data }, location) => {
  const classes = useStyles()

  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const [logos, setLogos] = useState([])
  const [searchType, setSearchType] = useState(true)

  let postCounter = 0
  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    try {
      const vendors = await client.fetch(`
        *[_type == 'vendor']`)
      let orderedBrands = orderBy(vendors, ["title"], ["asc"])
      setLogos(orderedBrands)
    } catch (e) {
      if (e !== "No current user") {
        alert(e)
      }
    }
  }

  return (
    <Layout title={siteTitle}>
      <SEO
        title="Woolly Mammoth Shoes"
        keywords={[`shoes`, `boots`, `seattle shoes`, `seattle boots`]}
      />
      {/* <SwipeableTextMobileStepper /> */}

      <br />
      <br />

      <br />

      <React.Fragment>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          <Button color="primary" variant="contained">
            <a
              href="https://www.facebook.com/thewoollymammothshoes/"
              target="_blank"
              style={{ color: "white" }}
            >
              <i className="fa fa-facebook" style={{ marginRight: 7 }} />
              Visit us on Facebook
            </a>
          </Button>
          <br />
          <Button
            color="default"
            variant="contained"
            onClick={() => document.getElementById("blog").click()}
          >
            {" "}
            <i className="fa fa-photo" style={{ marginRight: 7 }} />
            Visit our Blog
          </Button>
          <br />
          <Button color="secondary" variant="contained">
            {" "}
            <a
              href="https://www.instagram.com/thewoollymammothshoes/"
              target="_blank"
              style={{ color: "white" }}
            ></a>
            <i className="fa fa-instagram" style={{ marginRight: 7 }} />
            Follow on Instagram
          </Button>
        </div>
        <Link to="/blog">
          <div id="blog"></div>
        </Link>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <h2 id="dynamic-styles">Peace for your sole</h2>

          <div class="body-text-2">Telephone:(206)632-3254</div>
          <div class="body-text-2">Fax:(206)545-3814</div>
          <a href="mailto:info@woollymammothshoes.com" class="body-text-2 link">
            info@woollymammothshoes.com
          </a>
          <div class="body-text-2">4303 University Way NE</div>
          <div class="body-text-2">Seattle, WA 98105</div>
          <div class="body-text-2">
            We offer <b>free parking validation</b> <br />
            for any of the UDPA lots.
          </div>
        </div>
      </React.Fragment>
      <br />
      <br />
      <br />

      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Explore our brands
      </h1>
      <br />

      <div className="post-feed">
        {searchType === true ? (
          <React.Fragment>
            {logos.map((logo, i) => {
              postCounter++
              return (
                <React.Fragment>
                  {logo.visible === "visible" ? (
                    <ShoeCard
                      key={i}
                      count={postCounter}
                      node={logo}
                      postClass={`post`}
                    />
                  ) : null}
                </React.Fragment>
              )
            })}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {logos.map((logo, i) => {
              postCounter++
              return (
                <PostCard
                  key={i}
                  count={postCounter}
                  node={logo}
                  postClass={`post`}
                />
              )
            })}
          </React.Fragment>
        )}
      </div>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <BlogIndex location={props.location} props data={data} {...props} />
    )}
  />
)
