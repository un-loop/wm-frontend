import React, { useState } from "react"
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
import DialogTitle from "@material-ui/core/DialogTitle"
import CancelIcon from "@material-ui/icons/Cancel"
import IconButton from "@material-ui/core/IconButton"
import PaypalExpressBtn from "gatsby-paypal-button"
import Cart from "./Cart"
// import client from "../client
import UseAutoComplete from "../components/search"
import "./util.css"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { removeItem } from "../state/app"

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}))

const logonoAddClear = require("../images/logono_add_clear.png")
const newLogo = require("../images/logo.png")

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Layout = props => {
  const { title, children } = props
  const [toggleNav, setToggleNav] = useState(false)
  const [toggleCart, setToggleCart] = useState(false)
  const classes = useStyles()
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [zip, setZip] = React.useState("")
  const [city, setCity] = React.useState("")

  console.log("Layout props: ", props)

  const client = {
    sandbox: "Your-Sandbox-Client-ID",
    production: "Your-Production-Client-ID",
  }

  const handleFirst = event => {
    setFirstName(event.target.value)
  }

  const handleLast = event => {
    setLastName(event.target.value)
  }

  const handleAddress = event => {
    setAddress(event.target.value)
  }

  const handleCity = event => {
    setCity(event.target.value)
  }

  const handleZip = event => {
    setZip(event.target.value)
  }

  const closeCart = () => {
    setToggleCart(false)
  }

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
        // keepMounted
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
          <DialogContent style={{ textAlign: "center" }} dividers={true}>
            {/* <img
          src={require('../assets/warning.svg')}
          alt=''
          width='50'
          height='50'
        /> */}
          </DialogContent>

          <DialogTitle
            style={{ textAlign: "center" }}
            id="alert-dialog-slide-title"
          >
            {`Woolly Mammoth Checkout`}
          </DialogTitle>

          {props.everything.app.cart.map((cartItem, i) => {
            return (
              <React.Fragment>
                <div style={{ display: "flex" }}>
                  <p>{cartItem.model}</p>
                  <p>{cartItem.manufacturer}</p>
                  <p>{cartItem.price}</p>
                  {/* <p>{cartItem.image}</p> */}
                </div>
                <button onClick={() => props.removeItem(i)}>Remove Item</button>
              </React.Fragment>
            )
          })}

          <div>
            <TextField
              id="filled-name"
              placeholder="First Name"
              value={firstName}
              onChange={handleFirst}
              // variant="filled"
              style={{ width: "90%" }}
            />
            <TextField
              id="filled-name"
              placeholder="Last Name"
              value={lastName}
              onChange={handleLast}
              // variant="filled"
              style={{ width: "90%" }}
            />
            <TextField
              id="filled-name"
              placeholder="Street Address"
              value={address}
              onChange={handleAddress}
              // variant="filled"
              style={{ width: "90%" }}
            />
            <TextField
              id="filled-name"
              placeholder="City"
              value={city}
              onChange={handleCity}
              // variant="filled"
              style={{ width: "90%" }}
            />
            <TextField
              id="filled-name"
              placeholder="Zip Code"
              value={zip}
              onChange={handleZip}
              // variant="filled"
              style={{ width: "90%" }}
            />
          </div>

          <DialogContent>
            <DialogContentText
              style={{ textAlign: "center", color: "black" }}
              id="alert-dialog-slide-description"
            >
              Failure to respond to Mini-Case will negatively impact your
              company.
            </DialogContentText>
          </DialogContent>

          <PaypalExpressBtn client={client} currency={"USD"} total={1.0} />

          <DialogActions style={{ display: "flex", justifyContent: "center" }}>
            <Link>
              <Button
                style={{ margin: "15px auto", backgroundColor: "black" }}
                onClick={() => {
                  setToggleCart(false)
                  // props.toggleDarkMode(!props.everything.app.isDarkMode)
                }}
                variant="contained"
                color="primary"
              >
                Close Popup
              </Button>
            </Link>
          </DialogActions>
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
