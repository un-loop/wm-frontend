import React from "react"
import Backdrop from "../components/Backdrop/Backdrop"
import { Modal, ModalBody, ModalHeader, Button } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "../templates/blog-post"
// import 'bootstrap.modallery.min.js'

class Blundstone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      creating: false,
    }
  }
  startCreateEventHandler = () => {
    this.setState({ creating: true })
  }
  render() {
    return (
      <React.Fragment>
        <Backdrop />
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="modal"
        >
          <Modal.Header closeButton className="modal-header">
            <Modal.Title id="contained-modal-title-vcenter">
              Blundstone
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="">put the info</div>
            <h4>Centered Modal</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
              {/* <img
                      src={
                        .width(200)
                        .url()}
                    /> */}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide} className="modal-btn">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    )
  }
}

export default Blundstone
