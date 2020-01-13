import React from "react"
import Backdrop from "../components/Backdrop/Backdrop"
import { Modal, ModalBody, ModalHeader, Button } from "react-bootstrap"
import Carousel, { ModalGateway } from "react-images"
import "bootstrap/dist/css/bootstrap.min.css"
import "../templates/blog-post"
import SwipeableTextMobileStepper from "../components/ProductModal.js"
import SwipeableViews from "react-swipeable-views"
import { autoPlay } from "react-swipeable-views-utils"
import imageUrlBuilder from "@sanity/image-url"
import client from "../client"
const builder = imageUrlBuilder(client)
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)
// const images = [{src:this.state.images}]

class ProductDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      images: [],
    }
  }
  setModalState(showModal) {
    this.setState({
      showModal: showModal,
    })
  }

  render() {
    console.log("props", this.props)
    return (
      <React.Fragment>
        <Backdrop />
        <ModalGateway>
          <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modal"
          >
            <Modal.Header closeButton className="modal-header">
              {/* <Modal.Title id="contained-modal-title-vcenter">
              Blundstone
            </Modal.Title> */}
            </Modal.Header>
            {/* 
          <div className="">put the info</div>
          <h4>Centered Modal</h4> */}
            <div>
              <Modal.Body isOpen={this.state.showModal}>
                <SwipeableTextMobileStepper
                  // images={this.props.brands}
                  {...this.props}
                />
              </Modal.Body>
            </div>

            <Modal.Footer>
              <Button onClick={this.props.onHide} className="modal-btn">
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </ModalGateway>
      </React.Fragment>
    )
  }
}

export default ProductDisplay