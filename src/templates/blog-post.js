import React, { useState } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import client from "../client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import myConfiguredSanityClient from "../client"
import imageUrlBuilder from "@sanity/image-url"
import "../utils/css/components/global.css"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Button from "@material-ui/core/Button"
import { addItem } from "../state/app"
// import "bootstrap/dist/css/bootstrap.min.css"
import ProductDisplay from "../components/ProductDisplay"
const builder = imageUrlBuilder(myConfiguredSanityClient)

class BlogPostTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      brands: [],
      addModalShow: false,
      showBig: false,
      openingIndex: 0,
    }
  }
  async componentDidMount() {
    const brand = window.location.pathname.split("/")
    console.log(brand)
    console.log("Brand Page Props: ", this.props)
    try {
      const result = await client.fetch(
        `*[_type == 'product' && vendorTitle == '${brand[1]}']`
      )
      console.log("Products: ", result)
      this.setState({ brands: result })
    } catch (e) {
      console.log("Sanity fetch", e)
    }
  }

  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    let addModalClose = () => this.setState({ addModalShow: false })
    return (
      <div>
        <Layout location={this.props.location} title={siteTitle}>
          <SEO
            title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}
          />

          <article
            className={`post-content ${post.frontmatter.thumbnail ||
              `no-image`}`}
          >
            <header className="post-content-header">
              <h1 className="post-content-title">{post.frontmatter.title}</h1>
            </header>
            {post.frontmatter.description && (
              <p className="post-content-excerpt">
                {post.frontmatter.description}
              </p>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flex: "0 1 24%",
                flexWrap: "wrap",
              }}
            >
              {this.state.brands.map((brand, index) => {
                function urlFor(_ref) {
                  return builder.image(_ref)
                }
                let emptyArr = []
                brand.sizes.map((size, i) => {
                  let newArr = size.split(",")
                  newArr.map(item => {
                    emptyArr.push(item.slice(0, 2))
                  })
                })
                console.log("Empty: ", emptyArr)
                let cartItem = {
                  model: brand.title,
                  manufacturer: brand.vendorTitle,
                  price: brand.price,
                  image: brand.images,
                }
                let last2 = brand.price.slice(-2)
                let priceLength = brand.price.length - 2
                let firstFew = brand.price.slice(0, priceLength)
                let newPrice = `${firstFew}.${last2}`

                let shoeSize = emptyArr[0]

                // const [shoeSize, setShoeSize] = useState(36)

                // const handleChange = event => {
                //   console.log('event? :', event)
                //   setShoeSize(event.target.value);
                // }

                console.log("Shoe size: ", shoeSize)
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flexWrap: "wrap",
                      flex: "0 1 45%",
                      alignText: "center",
                    }}
                  >
                    <div
                      onClick={() =>
                        this.setState({
                          addModalShow: true,
                          openingIndex: index,
                        })
                      }
                    >
                      <img
                        src={urlFor(brand.images[0].asset._ref)
                          .width(400)
                          .url()}
                      />
                    </div>

                    <p style={{ display: "flex", justifyContent: "center" }}>
                      {brand.title}
                    </p>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: -20,
                      }}
                    >
                      ${newPrice}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <p>Sizes:&nbsp; </p>
                      {emptyArr.map((size, i) => {
                        return <p>{size},&nbsp; </p>
                      })}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Button onClick={() => this.props.addItem(cartItem)}>
                        Add To Cart
                      </Button>
                    </div>

                    {/* <FormControl>
                        <InputLabel id="demo-simple-select-helper-label">Shoe Sizes</InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={shoeSize}
                          onChange={handleChange}
                        >
                          {emptyArr.map((size, i) => {
                              return(
                                <MenuItem value={size}>{size}</MenuItem>
                              )
                            })}
                        
                        </Select>
                        <FormHelperText>Some important helper text</FormHelperText>
                      </FormControl> */}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flexWrap: "wrap",
                        }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>

            <ProductDisplay
              show={this.state.addModalShow}
              onHide={addModalClose}
              brands={this.state.brands}
              openingIndex={this.state.openingIndex}
            />

            {post.frontmatter.thumbnail && (
              <div className="post-content-image">
                <Img
                  className="kg-image"
                  fluid={post.frontmatter.thumbnail.childImageSharp.fluid}
                  alt={post.frontmatter.title}
                />
              </div>
            )}

            <div
              className="post-content-body"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            <footer className="post-content-footer"></footer>
          </article>
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // everything: state,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addItem: item => addItem(item),
      // swapThemeColors: (checked) => swapThemeColors(checked),
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostTemplate)

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 1360) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
