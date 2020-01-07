import React from "react"
import Backdrop from "../components/Backdrop/Backdrop"
import BlogPostTemplate from "../templates/blog-post.js"
import { Modal, ModalBody, ModalHeader, Button } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "../templates/blog-post"
// import 'bootstrap.modallery.min.js'

class Blundstone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
  }
  setModalState(showModal) {
    this.setState({
      showModal: showModal,
    })
  }
  // startCreateEventHandler = () => {
  //   this.setState({ showModal: true })
  // }
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

          <div className="">put the info</div>
          <h4>Centered Modal</h4>
          <div>
            <img
              src={this.props.brand}
              onClick={this.setModalState.bind(this, true)}
            />
            <Modal.Body isOpen={this.state.showModal}>
              <img
                src={this.props.brand}
                onClick={this.setModalState.bind(this, false)}
              />
            </Modal.Body>
          </div>

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
