import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"
import DropdownContainer from "./Dropdown"
import Slide from "@material-ui/core/Slide"
import Dialog from "@material-ui/core/Dialog"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import myConfiguredSanityClient from "../client"
import imageUrlBuilder from "@sanity/image-url"
import { ShoppingCart } from "@material-ui/icons"
import UseAutoComplete from "../components/search"
import "./util.css"
import CartItem from "../components/CartItem"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { removeItem, clearCart } from "../state/app"
import { Elements, StripeProvider } from "react-stripe-elements"
import BillingForm from "./BillingForm"
import Hidden from "@material-ui/core/Hidden"

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  icon: {
    height: "1.5em",
    width: "1.5em",
    fontWeight: 900,
  },
}))

const builder = imageUrlBuilder(myConfiguredSanityClient)
const smallWoolly = require("../images/wm-small-logo.png")
const logonoAddClear = require("../images/logono_add_clear.png")
const newLogo = require("../images/logo.png")

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Layout = props => {
  const { title, children } = props
  const [toggleNav, setToggleNav] = useState(false)
  // const [isSticky, setSticky] = useState(false)
  // const ref = useRef(null)
  const [toggleCart, setToggleCart] = useState(false)
  const [cartTotal, setCartTotal] = useState(0)
  const [toggleCheckout, setToggleCheckout] = useState(false)
  const classes = useStyles()
  const [displaySuccess, setDisplaySuccess] = useState(false)
  const [displayFailure, setDisplayFailure] = useState(false)
  const [checkoutComplete, setCheckoutComplete] = useState(false)

  const sendConfirmationEmail = params => {
    let body = {
      to: params.recipient,
      // to: 'misha@un-loop.org',
      from: params.sender,
      subject: params.subject,
      htmlBody: params.htmlBody,
      textBody: params.textBody,
    }
    try {
      console.log("API request body here: ", body)
      return fetch(
        "https://cors-anywhere.herokuapp.com/https://u1ilv840u4.execute-api.us-east-1.amazonaws.com/prod/email",
        {
          method: "POST",
          body: JSON.stringify(body),
          // mode: 'no-cors',
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
        }
      ).then(responseText => {
        console.log("Response text: ", responseText)
        console.log(responseText.status)
        // the status above (200 vs 500) will determine the loading/error message.
        var response = responseText.json()
        console.log("Response: ", response)
      })
    } catch (e) {
      console.log("Email send error: ", e)
    }
  }

  const [stripe, setStripe] = useState(null)

  useEffect(() => {
    if (typeof window !== undefined && typeof window.Stripe !== undefined) {
      setStripe(window.Stripe("pk_live_he28Fk30nKJvWw52HRR6keOo00cFoZhr0m"))
    }
  }, [])

  const handleSubmit = async stripeInfo => {
    let body = {
      ...stripeInfo.body,
      // amount: newtaxPrizeInt,
    }

    let orderInfo = []
    props.everything.app.cart.map((cartItem, i) => {
      let tempString
      tempString = `${i + 1}: ${cartItem.model} from ${
        cartItem.manufacturer
      } in size ${cartItem.size}`
      orderInfo.push(tempString)
    })

    let orderString = orderInfo.join()

    let emailInfo = {
      recipient: "matthea@woollymammothshoes.com",
      sender: "matthea@woollymammothshoes.com",
      subject: `New Woolly Sale - ${stripeInfo.body.firstName} ${stripeInfo.body.lastName}`,
      htmlBody: `<p>You have a new sale from ${stripeInfo.body.firstName} ${stripeInfo.body.lastName}. <br /><br />Their purchases include ${orderString}. <br /><br />Please ship the order to ${stripeInfo.body.address}, ${stripeInfo.body.city} ${stripeInfo.body.zip}</p>`,
      textBody: `You have a new sale from ${stripeInfo.body.firstName} ${stripeInfo.body.lastName}. Their purchases include ${orderString}. Please ship the order to ${stripeInfo.body.shippingAddress}, ${stripeInfo.body.shippingCity} ${stripeInfo.body.shippingZip}`,
    }

    let receiptInfo = {
      recipient: stripeInfo.body.email,
      sender: "matthea@woollymammothshoes.com",
      subject: `Thank You from Woolly Mammoth!`,
      htmlBody: `<p>We appreciate your support and your business! <br /><br />Your order will be delivered in 5-7 business days, please respond here if you have any questions. <br /><br />Sincerely,<br /><br />Matthea Anglin<br />Owner, Woolly Mammoth Shoes</p>`,
      textBody: `We appreciate your support and your business! Your order will be delivered in 5-7 business days, please respond here if you have any questions. Sincerely, Matthea Anglin - Owner, Woolly Mammoth Shoes`,
    }

    try {
      console.log("API request body here: ", body)
      let response = await fetch(
        "https://cors-anywhere.herokuapp.com/https://u1ilv840u4.execute-api.us-east-1.amazonaws.com/prod/billing",
        {
          method: "POST",
          body: JSON.stringify(body),
          // mode: 'no-cors',
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
        }
      )
        .then(responseText => {
          console.log("REsponse text: ", responseText)
          console.log(responseText.status)
          // the status above (200 vs 500) will determine the loading/error message.
          var response = responseText.json()
          console.log("Response: ", response)
          if (responseText.status === 200) {
            setDisplaySuccess(true)
            setCheckoutComplete(true)
            props.clearCart()
            sendConfirmationEmail(emailInfo)
            sendConfirmationEmail(receiptInfo)
          } else {
            setDisplayFailure(true)
          }
        })
        .catch(err => {
          setDisplayFailure(true)
        })

      console.log("Response: ", response)
    } catch (e) {
      console.log("Billing submissions error: ", e)
    }
  }

  let newPrice = "0"
  let priceArray = [0]

  props.everything.app.cart.map(cartItem => {
    priceArray.push(parseInt(cartItem.price, 10))
  })

  let sumTotal = priceArray.reduce((a, b) => a + b)

  let newTotal = sumTotal.toString()

  let last2 = newTotal.slice(-2)
  let priceLength = newTotal.length - 2
  let firstFew = newTotal.slice(0, priceLength)
  newPrice = `${firstFew}.${last2}`
  let newPriceWithTax = (newPrice * 1.095).toFixed(2)

  let taxPrizeString = newPriceWithTax.toString().split(".")
  let newTaxPrizeInt = parseInt(`${taxPrizeString[0]}${taxPrizeString[1]}`, 10)
  return (
    <>
      <div className={` ${toggleNav ? `site-head-open` : ``}`}>
        <header className="site-head">
          <div className="site-head-container">
            <a
              className="nav-burger"
              onClick={() => setToggleNav(!toggleNav)}
              style={{ paddingTop: 50 }}
            >
              <div
                className="hamburger hamburger--collapse"
                aria-label="Menu"
                role="button"
                aria-controls="navigation"
              >
                <div className="hamburger-box">
                  <div className="hamburger-inner" />
                  <br />
                </div>
              </div>
            </a>
            <nav id="swup" className="site-head-left" style={{ marginTop: 70 }}>
              <ul className="nav" role="menu">
                <li
                  className="nav-home"
                  role="menuitem"
                  onClick={() => setToggleNav(false)}
                >
                  <Link to={`/`}>Home</Link>
                </li>

                <li
                  className="nav-about"
                  role="menuitem"
                  onClick={() => setToggleNav(false)}
                >
                  <Link to={`/about`}>About</Link>
                </li>
                <li className="nav-elements" role="menuitem">
                  <Link to={`/contact`}>Contact</Link>
                </li>
                <li className="nav-elements" role="menuitem">
                  <Link to={`/blog`}>Blog</Link>
                </li>
                <li className="nav-elements" role="menuitem">
                  <Link to={`/brands`}>Brands</Link>
                </li>
              </ul>
            </nav>
            <div className="site-head-center">
              <Link className="site-head-logo" to={`/`}>
                <img src={smallWoolly}></img>
              </Link>
            </div>

            <nav className="site-head-right" style={{ marginTop: 70 }}>
              <ul className="nav" role="menu">
                <div className="social-links">
                  <a
                    href="https://www.facebook.com/pg/thewoollymammothshoes"
                    className={classes.icon}
                  >
                    <i className="fa fa-facebook" />
                  </a>
                  <a
                    href="https://www.instagram.com/thewoollymammothshoes/"
                    className={classes.icon}
                  >
                    <i className="fa fa-instagram" />
                  </a>
                </div>
              </ul>
            </nav>
          </div>
        </header>
        <div
          style={{
            backgroundColor: "#584E8F",
            display: "flex",
            justifyContent: "space-between",
          }}
        >

          <div>
            <ul
              style={{ listStyle: "none", display: "flex", height: "2.7rem" }}
            >
              <li>
                <DropdownContainer title="Women" gender="Women" key={title} />
              </li>
              <li style={{ marginLeft: -12 }}>
                <DropdownContainer title="Men" gender="Men" key={title} />
              </li>
              <li>
                <UseAutoComplete style={{}} />
              </li>
            </ul>
          </div>
          <div>
            <a className="feedback" onClick={() => setToggleCart(true)}>
              <ShoppingCart style={{ fontSize: "3.8rem" }} />(
              {props.everything.app.cart.length})
            </a>
          </div>
        </div>

        <main
          id="site-main"
          className="site-main site-wrapper"
          style={{ marginTop: -30 }}
        >

          <div id="swup" className="transition-fade">
            {children}
          </div>
        </main>
        <Dialog
          style={{ margin: "auto" }}
          open={toggleCart}
          TransitionComponent={Transition}
          disableBackdropClick={false}
          hideBackdrop={false}
          onClose={() => setToggleCart(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <div>
            <DialogContent style={{ textAlign: "center", paddingBottom: 30 }}>
              Woolly Mammoth Checkout <br />
              {props.everything.app.cart.length < 1 ? (
                <p>Cart Total: $0</p>
              ) : (
                <React.Fragment>
                  <p>Cart Total: ${newPrice}</p>
                  <p>With Tax: ${newPriceWithTax}</p>
                </React.Fragment>
              )}
              Free Shipping Arrives in 5-7 Days
            </DialogContent>

            {!toggleCheckout ? (
              <div>
                {props.everything.app.cart.map((cartItem, i) => {
                  function urlFor(_ref) {
                    return builder.image(_ref)
                  }
                  let last2 = cartItem.price.slice(-2)
                  let priceLength = cartItem.price.length - 2
                  let firstFew = cartItem.price.slice(0, priceLength)
                  let newPrice = `${firstFew}.${last2}`
                  let firstLetter = cartItem.manufacturer[0].toUpperCase()
                  let restOf = cartItem.manufacturer.slice(1)
                  let newManufacturer = `${firstLetter}${restOf}`
                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: 20,
                        borderStyle: "solid",
                        borderWidth: "1px",
                        borderColor: "gray",
                      }}
                    >
                      <div>
                        <p style={{ paddingRight: 10 }}>{cartItem.model}</p>
                        <p>{newManufacturer}</p>
                        <p>${newPrice}</p>
                        <button onClick={() => props.removeItem(i)}>
                          Remove
                        </button>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flex: "0 1 45%",
                          flexDirection: "column",
                        }}
                      >
                        <img src={urlFor(cartItem.image[0].asset._ref).url()} />
                        <CartItem
                          emptyArr={cartItem.sizes}
                          item={cartItem}
                          itemIndex={i}
                        />
                      </div>
                    </div>
                  )
                })}

                <DialogActions
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    style={{ margin: "15px auto", backgroundColor: "orange" }}
                    onClick={() => {
                      setToggleCart(false)
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Close Cart
                  </Button>
                  <Button
                    style={{ margin: "15px auto", backgroundColor: "green" }}
                    onClick={() => {
                      setToggleCheckout(true)
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Checkout
                  </Button>
                </DialogActions>
              </div>
            ) : (
              <div>
                <StripeProvider stripe={stripe}>
                  <Elements>
                    <BillingForm
                      handleSubmit={handleSubmit}
                      displaySuccess={displaySuccess}
                      displayFailure={displayFailure}
                      checkoutComplete={checkoutComplete}
                      totalInt={newTaxPrizeInt}
                    />
                  </Elements>
                </StripeProvider>

                <DialogActions
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    style={{ margin: "15px auto", backgroundColor: "orange" }}
                    onClick={() => {
                      setToggleCart(false)
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Close Cart
                  </Button>
                  <Button
                    style={{ margin: "15px auto", backgroundColor: "#584e8f" }}
                    onClick={() => {
                      setToggleCheckout(false)
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Back to Cart
                  </Button>
                </DialogActions>
              </div>
            )}

            <div></div>
          </div>
        </Dialog>
        <footer className="site-foot" style={{ marginTop: 30 }}>
          &copy; {new Date().getFullYear()} <Link to={`/`}>{title}</Link> v
          1.0.0
        </footer>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    everything: state,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      removeItem: index => removeItem(index),
      clearCart: checked => clearCart(checked),
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
