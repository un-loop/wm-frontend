import React from "react"
import Backdrop from "../components/Backdrop/Backdrop"
import BlogPostTemplate from "../templates/blog-post.js"
import { Modal, ModalBody, ModalHeader, Button } from "react-bootstrap"
import Carousel, { Modal, ModalGateway } from "react-images"
import "bootstrap/dist/css/bootstrap.min.css"
import "../templates/blog-post"
import SwipeableViews from "react-swipeable-views"
import { autoPlay } from "react-swipeable-views-utils"
// import Button from "@material-ui/core/Button"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import imageUrlBuilder from "@sanity/image-url"
import client from "../client"
// import 'bootstrap.modallery.min.js'
const builder = imageUrlBuilder(client)
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)
class Blundstone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      images: [],
    }
  }
  setModalState(showModal) {
    this.setState({
      showModal: showModal,
    })
  }

  async componentDidMount() {
    const brand = window.location.pathname.split("/")
    console.log(brand)
    try {
      const networkResponse = await client.fetch(`
      *[_type == 'product' && vendorTitle == '${brand[1]}']`)

      console.log("testing 123", networkResponse)
      this.setState({ images: networkResponse })
    } catch (e) {
      console.log(e)
    }
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
            <Modal.Body isOpen={this.state.showModal}>
              {/* <img
                src={this.props.brand}
                onClick={this.setModalState.bind(this, false)}
              /> */}
              {this.state.images.map((image, index) => {
                console.log("image:", image)
                function urlFor(_ref) {
                  return builder.image(_ref)
                }
                return (
                  <div key={index}>
                    {/* {Math.abs(activeStep - index) <= 2 ? ( */}
                    <img
                      // className={classes.img}
                      src={urlFor(
                        image.defaultProductVariant.images[0].asset._ref
                      )
                        .width(200)
                        .url()}
                      // src={image.image}
                      // alt={image.label}
                    />
                    {/* ) : null} */}
                  </div>
                )
              })}
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
