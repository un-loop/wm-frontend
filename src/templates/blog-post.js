import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import client from "../client"
import Layout from "../components/layout"
import SEO from "../components/seo"
import myConfiguredSanityClient from "../client"
import imageUrlBuilder from "@sanity/image-url"
import "../utils/css/components/global.css"
import "../pages/sandbox.css"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Button from "@material-ui/core/Button"
import { addItem } from "../state/app"
import ProductDisplay from "../components/ProductDisplay"
const builder = imageUrlBuilder(myConfiguredSanityClient)

class BlogPostTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      brands: [],
      femaleBrands: [],
      maleBrands: [],
      addModalShow: false,
      showBig: false,
      openingIndex: 0,
      brand: "",
    }
  }
  async componentDidMount() {
    const brand = window.location.pathname.split("/")
    try {
      let female = []
      let male = []
      const result = await client.fetch(
        `*[_type == 'product' && vendorTitle == '${brand[1]}']`
      )
      this.setState({ brands: result, brand: brand[1] })
      result.map((item, i) => {
        if (item.categories === "Men") {
          male.push(item)
        } else if (item.categories === "Women") {
          female.push(item)
        } else {
          female.push(item)
          male.push(item)
        }
      })
      this.setState({ femaleBrands: female, maleBrands: male })
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

            {this.state.brands.length <= 1 ? (
              <p className="post-content-excerpt">More Inventory Coming Soon</p>
            ) : null}

            {this.state.femaleBrands.length < 1 ? null : <h2>Women's Shoes</h2>}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flex: "0 1 24%",
                flexWrap: "wrap",
              }}
            >
              {this.state.femaleBrands.map((brand, index) => {
                function urlFor(_ref) {
                  return builder.image(_ref)
                }
                let emptyArr = []
                brand.sizes.map((size, i) => {
                  let newArr = size.split(",")
                  newArr.map(item => {
                    emptyArr.push(item.slice(0, 4))
                  })
                })
                let cartItem = {
                  model: brand.title,
                  manufacturer: brand.vendorTitle,
                  price: brand.price,
                  image: brand.images,
                  sizes: emptyArr,
                  size: emptyArr[0],
                }
                let last2 = brand.price.slice(-2)
                let priceLength = brand.price.length - 2
                let firstFew = brand.price.slice(0, priceLength)
                let newPrice = `${firstFew}.${last2}`

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

                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignSelf: "center",
                        alignItems: "center",
                      }}
                    >
                      {brand.title}
                    </p>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: -10,
                      }}
                    >
                      ${newPrice}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        // flexWrap: "wrap",
                        minHeight: 120,
                        marginTop: -20,
                      }}
                    >
                      <p style={{ fontWeight: "bold" }}>Sizes</p>
                      {this.state.brand !== "blundstone" ? (
                        <div style={{ marginTop: -10 }}>
                          {brand.sizes.map((size, i) => {
                            return <p key={i}>{size},&nbsp; </p>
                          })}
                        </div>
                      ) : (
                        <div style={{ marginTop: -10 }}>
                          {brand.sizes.map((size, i) => {
                            return <p key={i}>{size}</p>
                          })}
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Button
                        onClick={() => this.props.addItem(cartItem)}
                        style={{
                          margin: "15px auto",
                          backgroundColor: "green",
                          color: "white",
                          width: "100%",
                        }}
                        color="primary"
                        variant="contained"
                      >
                        Add To Cart
                      </Button>
                    </div>
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flex: "0 1 24%",
                flexWrap: "wrap",
              }}
            >
              {this.state.maleBrands.length < 1 ? null : <h2>Men's Shoes</h2>}
              {this.state.maleBrands.map((brand, index) => {
                function urlFor(_ref) {
                  return builder.image(_ref)
                }
                let emptyArr = []
                brand.sizes.map((size, i) => {
                  let newArr = size.split(",")
                  newArr.map(item => {
                    emptyArr.push(item.slice(0, 4))
                  })
                })
                let cartItem = {
                  model: brand.title,
                  manufacturer: brand.vendorTitle,
                  price: brand.price,
                  image: brand.images,
                  sizes: emptyArr,
                  size: emptyArr[0],
                }
                let last2 = brand.price.slice(-2)
                let priceLength = brand.price.length - 2
                let firstFew = brand.price.slice(0, priceLength)
                let newPrice = `${firstFew}.${last2}`

                let shoeSize = emptyArr[0]

                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignText: "center",
                    }}
                  >
                    <div>
                      <img
                        src={urlFor(brand.images[0].asset._ref).url()}
                        onClick={() =>
                          this.setState({
                            addModalShow: true,
                            openingIndex: index,
                          })
                        }
                        className="#imgHover"
                      />

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
                        <Button
                          onClick={() => this.props.addItem(cartItem)}
                          style={{
                            margin: "15px auto",
                            backgroundColor: "green",
                            color: "white",
                            width: "50%",
                          }}
                          color="primary"
                          variant="contained"
                        >
                          Add To Cart
                        </Button>
                      </div>
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
      }
    }
  }
`
