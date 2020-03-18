import React, { useState, useEffect } from "react"
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
import DialogTitle from "@material-ui/core/DialogTitle"
import CancelIcon from "@material-ui/icons/Cancel"
import IconButton from "@material-ui/core/IconButton"
// import PaypalExpressBtn from "gatsby-paypal-button"
import Cart from "./Cart"
// import client from "../client
import UseAutoComplete from "../components/search"
import "./util.css"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { removeItem } from "../state/app"
import { Elements, StripeProvider } from "react-stripe-elements"
import BillingForm from "./BillingForm"
import Amplify, { API } from "aws-amplify"

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}))

const builder = imageUrlBuilder(myConfiguredSanityClient)

const logonoAddClear = require("../images/logono_add_clear.png")
const newLogo = require("../images/logo.png")

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Layout = props => {
  const { title, children } = props
  const [toggleNav, setToggleNav] = useState(false)
  const [toggleCart, setToggleCart] = useState(false)
  const [cartTotal, setCartTotal] = useState(0)
  const [toggleCheckout, setToggleCheckout] = useState(false)
  const classes = useStyles()

  const sendConfirmationEmail = async params => {
    let body = {
      to: params.recipient,
      from: params.sender,
      subject: params.subject,
      htmlBody: params.htmlBody,
      textBody: params.textBody,
    }
    try {
      console.log("API request body here: ", body)
      let response = await fetch(
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
        console.log("REsponse text: ", responseText)
        console.log(responseText.status)
        // the status above (200 vs 500) will determine the loading/error message.
        var response = responseText.json()
        console.log("Response: ", response)
      })

      console.log("Response: ", response)
    } catch (e) {
      console.log("Email send error: ", e)
    }
  }

  const [stripe, setStripe] = useState(null)

  useEffect(() => {
    if (typeof window !== undefined && typeof window.Stripe !== undefined) {
      setStripe(window.Stripe("pk_test_hnclQ0ChvfU9waes6yOHnPbx00oNYQkfIw"))
    }
  }, [])

  const handleSubmit = async stripeInfo => {
    let body = {
      ...stripeInfo.body,
      amount: 125000,
    }

    // let emailInfo = {
    //   recipient: `matthea@woollymammothshoes.com`,
    //   sender: 'paretojs@gmail.com',
    //   subject: `New Woolly Sale!`,
    //   htmlBody: `You have a new sale from ${stripeInfo.body.firstName} ${stripeInfo.body.lastName}`,
    //   textBody: `<p></p>`,
    // }

    // let emailInfo = {
    //   recipient: stripeInfo.body.,
    //   sender: 'paretojs@gmail.com',
    //   subject: `New Woolly Sale!`,
    //   htmlBody: `You have a new sale from ${stripeInfo.bodyfirstName} ${stripeInfo.lastName}`,
    //   textBody: `<p></p>`,
    // }

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
      ).then(responseText => {
        console.log("REsponse text: ", responseText)
        console.log(responseText.status)
        // the status above (200 vs 500) will determine the loading/error message.
        var response = responseText.json()
        console.log("Response: ", response)
      })

      // await sendConfirmationEmail()

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
  console.log(sumTotal)

  let newTotal = sumTotal.toString()

  let last2 = newTotal.slice(-2)
  let priceLength = newTotal.length - 2
  let firstFew = newTotal.slice(0, priceLength)
  newPrice = `${firstFew}.${last2}`
  console.log(newPrice)

  return (
    <div className={`site-wrapper ${toggleNav ? `site-head-open` : ``}`}>
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
            </ul>
          </nav>
          <div className="site-head-center">
            <Link className="site-head-logo" to={`/`}>
              <img src="http://woollymammothshoes.com/wordpress/wp-content/themes/twentyten-child/images/woolly_logo.png"></img>
            </Link>
          </div>

          <nav className="site-head-right" style={{ marginTop: 70 }}>
            <ul className="nav" role="menu">
              <div className="social-links">
                <a href="https://www.facebook.com/pg/thewoollymammothshoes">
                  <i className="fa fa-facebook" />
                </a>
                <a href="https://www.instagram.com/thewoollymammothshoes/">
                  <i className="fa fa-instagram" />
                </a>
              </div>
              <li className="nav-elements" role="menuitem">
                <Link to={`/blog`}>Blog</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div style={{ backgroundColor: "#584E8F" }}>
        <ul style={{ listStyle: "none", display: "flex" }}>
          <li>
            <DropdownContainer title="Women" gender="female" key={title} />
          </li>
          <li>
            <DropdownContainer title="Men" gender="male" key={title} />
          </li>
          <li>
            <UseAutoComplete style={{}} />
          </li>
        </ul>
      </div>
      <header>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={newLogo} alt="logo" style={{ marginLeft: 20 }} />
        </div>
      </header>
      <main id="site-main" className="site-main" style={{ marginTop: -30 }}>
        <div id="swup" className="transition-fade">
          {children}
        </div>
        <div id="mybutton">
          <button class="feedback" onClick={() => setToggleCart(true)}>
            View Cart
          </button>
        </div>
      </main>
      <Dialog
        style={{
          margin: "auto",
        }}
        open={toggleCart}
        TransitionComponent={Transition}
        disableBackdropClick={false}
        hideBackdrop={false}
        onClose={() => setToggleCart(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div>
          <IconButton
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              padding: "0px",
            }}
            onClick={() => setToggleCart(false)}
          >
            <CancelIcon />
          </IconButton>
          <DialogContent style={{ textAlign: "center", paddingBottom: 30 }}>
            Woolly Mammoth Checkout <br />
            {props.everything.app.cart.length < 1 ? (
              <p>Cart Total: $0</p>
            ) : (
              <p>Cart Total: ${newPrice}</p>
            )}
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
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: 20,
                    }}
                  >
                    <div>
                      <p>{cartItem.model}</p>
                      <p>{cartItem.manufacturer}</p>
                      <p>${newPrice}</p>
                      {/* <p>{cartItem.image}</p> */}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <img
                        src={urlFor(cartItem.image[0].asset._ref)
                          .width(100)
                          .url()}
                      />
                      <button onClick={() => props.removeItem(i)}>
                        Remove Item
                      </button>
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
                  <BillingForm handleSubmit={handleSubmit} />
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
                  style={{ margin: "15px auto", backgroundColor: "green" }}
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
        &copy; {new Date().getFullYear()} <Link to={`/`}>{title}</Link>
      </footer>
    </div>
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
      // swapThemeColors: (checked) => swapThemeColors(checked),
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
