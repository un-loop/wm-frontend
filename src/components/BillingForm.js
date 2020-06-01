import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import FormControl from "@material-ui/core/FormControl"
import FormGroup from "@material-ui/core/FormGroup"
import FormLabel from "@material-ui/core/FormLabel"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Button from "@material-ui/core/Button"
import Progress from "./Progress"
import { CardElement, injectStripe } from "react-stripe-elements"

const stripeLogo = require("../images/secure-stripe-payment-logo.png")

function BillingForm({ isLoading, onSubmit, ...props }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCardComplete, setIsCardComplete] = useState(false)
  const [customerEmail, setCustomerEmail] = useState("")
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [zip, setZip] = React.useState("")
  const [city, setCity] = React.useState("")
  const [state, setState] = React.useState({
    newAddress: true,
  })
  const [shippingAddress, setShippingAddress] = useState("")
  const [shippingZip, setShippingZip] = React.useState("")
  const [shippingCity, setShippingCity] = React.useState("")
  const [toggleCheckout, setToggleCheckout] = useState(false)

  const { newAddress } = state

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }
  const handleCustomerEmail = event => {
    setCustomerEmail(event.target.value)
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

  const handleShippingAddress = event => {
    setShippingAddress(event.target.value)
  }

  const handleShippingCity = event => {
    setShippingCity(event.target.value)
  }

  const handleShippingZip = event => {
    setShippingZip(event.target.value)
  }

  isLoading = isProcessing || isLoading

  function validateForm() {
    return (
      firstName !== "" &&
      lastName !== "" &&
      address !== "" &&
      city !== "" &&
      (zip !== "") & (customerEmail !== "")
    )
  }

  async function handleSubmitClick(event) {
    event.preventDefault()

    let description = `Purchase from ${firstName} ${lastName} , located at ${address}, ${city}, ${zip}.`

    setIsProcessing(true)

    const { token, error } = await props.stripe.createToken({
      name: props.firstName,
    })

    if (error) {
      alert("Please check the credit card number you entered.")
      setIsProcessing(false)
      return
    }

    let body = {
      total: props.totalInt,
      firstName: firstName,
      lastName: lastName,
      email: customerEmail,
      address: address,
      city: city,
      zip: zip,
      source: token.id,
      description: description,
      shippingAddress: newAddress === true ? address : shippingAddress,
      shippingCity: newAddress === true ? city : shippingCity,
      shippingZip: newAddress === true ? zip : shippingZip,
    }

    props.handleSubmit({ token, error, body })
    setIsProcessing(false)
  }
  return (
    <form onSubmit={handleSubmitClick}>
      <TextField
        id="filled-name"
        placeholder="First Name"
        value={firstName}
        onChange={handleFirst}
        //   variant="outlined"
        style={{ width: "100%", paddingLeft: 10, paddingRight: 10 }}
      />
      <br />
      <br />
      <TextField
        id="filled-name"
        placeholder="Last Name"
        value={lastName}
        onChange={handleLast}
        variant="filled"
        style={{ width: "100%", paddingLeft: 10, paddingRight: 10 }}
      />
      <br />
      <br />
      <TextField
        id="filled-name"
        placeholder="Email"
        value={customerEmail}
        onChange={handleCustomerEmail}
        //   variant="outlined"
        style={{ width: "100%", paddingLeft: 10, paddingRight: 10 }}
      />
      <br />
      <br />
      <p style={{ paddingLeft: 10, paddingRight: 10 }}>
        Please enter your billing address.
      </p>
      <TextField
        id="filled-name"
        placeholder="Street Address"
        value={address}
        onChange={handleAddress}
        variant="filled"
        style={{ width: "100%", paddingLeft: 10, paddingRight: 10 }}
      />
      <br />
      <br />

      <TextField
        id="filled-name"
        placeholder="City"
        value={city}
        onChange={handleCity}
        variant="filled"
        style={{ width: "100%", paddingLeft: 10, paddingRight: 10 }}
      />
      <br />
      <br />

      <TextField
        id="filled-name"
        placeholder="Zip Code"
        value={zip}
        onChange={handleZip}
        variant="filled"
        style={{ width: "100%", paddingLeft: 10, paddingRight: 10 }}
      />
      <br />
      <div style={{ padding: 18 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Shipping Address</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={newAddress}
                  onChange={handleChange}
                  name="newAddress"
                />
              }
              label="Do you have the same Shipping & billing address?"
            />
          </FormGroup>
        </FormControl>
      </div>

      {newAddress === false ? (
        <div>
          <br />
          <p style={{ paddingLeft: 10, paddingRight: 10 }}>
            Please enter your shipping information.
          </p>

          <TextField
            id="filled-name"
            placeholder="Street Address"
            value={shippingAddress}
            onChange={handleShippingAddress}
            variant="filled"
            style={{ width: "100%", paddingLeft: 10, paddingRight: 10 }}
          />
          <br />
          <br />

          <TextField
            id="filled-name"
            placeholder="City"
            value={shippingCity}
            onChange={handleShippingCity}
            variant="filled"
            style={{ width: "100%", paddingLeft: 10, paddingRight: 10 }}
          />
          <br />
          <br />

          <TextField
            id="filled-name"
            placeholder="Zip Code"
            value={shippingZip}
            onChange={handleShippingZip}
            variant="filled"
            style={{ width: "100%", paddingLeft: 10, paddingRight: 10 }}
          />
          <br />
        </div>
      ) : null}

      <br />
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        To use a Woolly Mammoth gift card or make a purchase over the phone,
        call (206) 851-9141!
      </p>

      <div style={{ paddingLeft: 10, paddingRight: 10 }} className="block">
        <p>Enter your payment information below:</p>
        <CardElement
          className="card-field"
          onChange={e => setIsCardComplete(e.complete)}
          style={{
            base: {
              paddingLeft: 4,
              paddingRight: 4,
              fontSize: "12px",
              fontFamily: '"Open Sans", sans-serif',
            },
          }}
        />
        <img src={stripeLogo} style={{ height: 30, marginTop: 22 }} />
      </div>
      <br />
      <br />

      {props.checkoutComplete === false ? (
        <React.Fragment>
          {validateForm() === 1 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <div> */}
              <Button
                style={{
                  margin: "15px auto",
                  backgroundColor: "green",
                  width: "70%",
                }}
                onClick={handleSubmitClick}
                variant="contained"
                color="primary"
                disabled={isProcessing}
              >
                Finish Checkout
                {isProcessing && <Progress variant="overlay" size="1.5em" />}
              </Button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <h3
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                Please fill out all fields before the Checkout button appears.
              </h3>
            </div>
          )}
        </React.Fragment>
      ) : (
        <h3
          style={{
            display: "flex",
            justifyContent: "center",
            paddingRight: 10,
            paddingLeft: 10,
          }}
        >
          Thank you for shopping with us!
        </h3>
      )}

      {props.displaySuccess === true ? (
        <p style={{ display: "flex", justifyContent: "center" }}>Success!</p>
      ) : null}

      {props.displayFailure === true ? (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            paddingRight: 10,
            paddingLeft: 10,
          }}
        >
          Your transaction failed, please check the card number you entered or
          try a different payment option.
        </p>
      ) : null}
    </form>
  )
}

export default injectStripe(BillingForm)
