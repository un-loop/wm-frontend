import React, { useState, useEffect } from "react"
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
import Snackbar from "@material-ui/core/Snackbar"
import SnackbarContent from "@material-ui/core/SnackbarContent"
import Slide from "@material-ui/core/Slide"
import { ToastContainer } from "react-toastr"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

const builder = imageUrlBuilder(myConfiguredSanityClient)
function TransitionDown(props) {
  return <Slide {...props} direction="down" />
}
function SlideTransition(props) {
  return <Slide {...props} direction="up" />
}
const BlogPostTemplate = props => {
  console.log("blog post props: ", props)
  const [state, setState] = React.useState({
    open: false,
    Transition: Slide,
    vertical: "top",
    horizontal: "center",
  })
  const [brands, setBrands] = useState([])
  const [femaleBrands, setFemaleBrands] = useState([])
  const [maleBrands, setMaleBrands] = useState([])
  const [addModalShow, setAddModalShow] = useState(false)
  const [showBig, setShowBig] = useState(false)
  const [openingIndex, setOpeningIndex] = useState(0)
  const [brand, setBrand] = useState("")
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState([])

  useEffect(() => {
    onLoad()
  }, [])
  async function onLoad() {
    const brand = window.location.pathname.split("/")
    try {
      let female = []
      let male = []
      const result = await client.fetch(
        `*[_type == 'product' && vendorTitle == '${brand[1]}']`
      )
      console.log("result from api blog: ", result)
      let sortResult = result.sort((a, b) => {
        let orderBool = a.title > b.title
        return orderBool ? 1 : -1
      })
      console.log("sortResult: ", sortResult)
      setBrands(sortResult)
      setBrand(brand[1])
      // this.setState({ brands: result, brand: brand[1] })
      sortResult.map((item, i) => {
        if (item.categories === "Men") {
          male.push(item)
        } else if (item.categories === "Women") {
          female.push(item)
        } else {
          female.push(item)
          male.push(item)
        }
      })
      setFemaleBrands(female)
      setMaleBrands(male)
      // this.setState({ femaleBrands: female, maleBrands: male })
    } catch (e) {
      console.log("Sanity fetch", e)
    }
  }
  const handleOnClick = cartItem => {
    // props.addItem(cartItem)
    handleClick(SlideTransition)
  }
  const handleClick = Transition => {
    console.log("inside of blog handle click")
    setState({
      open: true,
      Transition,
    })
  }
  const handleClose = () => {
    setState({
      ...state,
      open: false,
    })
  }
  const post = props.data.markdownRemark
  const siteTitle = props.data.site.siteMetadata.title
  let addModalClose = () => setAddModalShow(false)
  return (
    <div>
      <Layout location={props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article
          className={`post-content ${post.frontmatter.thumbnail || `no-image`}`}
        >
          <header className="post-content-header">
            <h1 className="post-content-title">{post.frontmatter.title}</h1>
          </header>
          {brands.length <= 1 ? (
            <p className="post-content-excerpt">More Inventory Coming Soon</p>
          ) : null}
          {femaleBrands.length < 1 ? null : <h2>Women's Shoes</h2>}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flex: "0 1 24%",
              flexWrap: "wrap",
            }}
          >
            {femaleBrands.map((brand, index) => {
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
                    onClick={() => {
                      setAddModalShow(true)
                      setCategory(femaleBrands)
                      setOpeningIndex(index)
                    }}
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
                      marginBottom: -30,
                    }}
                  >
                    <p style={{ fontWeight: "bold" }}>Sizes</p>
                    {brand !== "blundstone" ? (
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
                      onClick={() => {
                        handleClick(SlideTransition)
                        props.addItem(cartItem)
                      }}
                      style={{
                        margin: "3em auto",
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
          <div>
            {maleBrands.length < 1 ? null : <h2>Men's Shoes</h2>}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flex: "0 1 24%",
                flexWrap: "wrap",
              }}
            >
              {maleBrands.map((brand, index) => {
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
                      flexWrap: "wrap",
                      flex: "0 1 45%",
                      alignText: "center",
                    }}
                  >
                    <div
                      onClick={() => {
                        setAddModalShow(true)
                        setCategory(maleBrands)
                        setOpeningIndex(index)
                      }}
                    >
                      <img
                        src={urlFor(brand.images[0].asset._ref)
                          .width(400)
                          .url()}
                      />
                    </div>
                    {/* className="#imgHover" */}
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
                        minHeight: 120,
                        marginTop: -20,
                        marginBottom: -30,
                      }}
                    >
                      <p style={{ fontWeight: "bold" }}>Sizes</p>
                      {/* {emptyArr.map((size, i) => {
                        return <p>{size},&nbsp; </p>
                      })} */}
                      {brand !== "blundstone" ? (
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
                        onClick={() => {
                          handleClick(SlideTransition)
                          props.addItem(cartItem)
                        }}
                        style={{
                          margin: "3em auto",
                          backgroundColor: "green",
                          color: "white",
                          width: "100%",
                        }}
                        color="primary"
                        variant="contained"
                      >
                        Add To Cart
                      </Button>
                      {/* <Snackbar
                        className="MuiSnackbar-anchorOriginTopCenter"
                        open={state.open}
                        onClose={handleClose}
                        TransitionComponent={state.Transition}
                        message="I love code"
                      /> */}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <ProductDisplay
            show={addModalShow}
            onHide={addModalClose}
            brands={category}
            openingIndex={openingIndex}
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
      <Snackbar
        className="MuiSnackbar-root"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={state.open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={state.Transition}
      >
        <SnackbarContent
          style={{
            backgroundColor: "teal",
            color: "white",
          }}
          message="Successfully Added to the Cart"
        ></SnackbarContent>
      </Snackbar>
    </div>
  )
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
