import React from "react"
import Button from "@material-ui/core/Button"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import CancelIcon from "@material-ui/icons/Cancel"
import IconButton from "@material-ui/core/IconButton"
import { Link } from "gatsby"

// pass open/close in as props
const AttentionModal = props => {
  return (
    <div>
      <IconButton
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          padding: "0px",
        }}
        onClick={props => props.handleClose()}
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
        {`Welcome to Q${(props.quarter + 1).toString()}!`}
      </DialogTitle>

      <DialogContent>
        <DialogContentText
          style={{ textAlign: "center", color: "black" }}
          id="alert-dialog-slide-description"
        >
          Your Executive Assistant has just brought to your attention a new
          development which requires urgent action.
          <br />
          <br />
          <h2>Cart info</h2>
          <br />
          <p>More Cart Info</p>
        </DialogContentText>

        <DialogContentText
          style={{ textAlign: "center", color: "black" }}
          id="alert-dialog-slide-description"
        >
          Failure to respond to Mini-Case will negatively impact your company.
        </DialogContentText>
      </DialogContent>

      <DialogActions style={{ display: "flex", justifyContent: "center" }}>
        <Link>
          <Button
            style={{ margin: "15px auto", backgroundColor: "black" }}
            onClick={() => {
              props.handleClose()
            }}
            variant="contained"
            color="primary"
          >
            Close Popup
          </Button>
        </Link>
        <Link to="/case/details">
          <Button
            style={{ margin: "15px auto", backgroundColor: "black" }}
            onClick={() => {
              props.handleClose()
            }}
            variant="contained"
            color="primary"
          >
            See Mini-Case Details
          </Button>
        </Link>
      </DialogActions>
    </div>
  )
}

export default AttentionModal
