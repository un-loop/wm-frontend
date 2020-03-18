import React, { useState } from "react"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import { CardElement, injectStripe } from "react-stripe-elements"

function BillingForm({ isLoading, onSubmit, ...props }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCardComplete, setIsCardComplete] = useState(false)
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [zip, setZip] = React.useState("")
  const [city, setCity] = React.useState("")

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

  isLoading = isProcessing || isLoading

  //   function validateForm() {
  //     return (
  //       fields.name !== "" &&
  //       fields.storage !== "" &&
  //       isCardComplete
  //     );
  //   }

  async function handleSubmitClick(event) {
    event.preventDefault()

    let description = `Purchase from ${firstName} ${lastName}, located at ${address}, ${city}, ${zip}.`

    setIsProcessing(true)

    const { token, error } = await props.stripe.createToken({
      name: props.firstName,
    })

    console.log("Token: ", token)
    console.log("Tokenization Error: ", error)

    setIsProcessing(false)

    let body = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      zip: zip,
      source: token.id,
      description: description,
    }

    props.handleSubmit({ token, error, body })
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
      <br />

      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <CardElement
          className="card-field"
          onChange={e => setIsCardComplete(e.complete)}
          style={{
            base: { fontSize: "18px", fontFamily: '"Open Sans", sans-serif' },
          }}
        />
      </div>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          style={{ margin: "15px auto", backgroundColor: "green" }}
          onClick={handleSubmitClick}
          variant="contained"
          color="primary"
        >
          Checkout
        </Button>
      </div>
    </form>
  )
}

export default injectStripe(BillingForm)
