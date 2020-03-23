import React, { useState, useEffect } from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import MobileStepper from "@material-ui/core/MobileStepper"
import Paper from "@material-ui/core/Paper"
// import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft"
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight"
import SwipeableViews from "react-swipeable-views"
import { autoPlay } from "react-swipeable-views-utils"
import myConfigSanityClient from "../client"
import imageUrlBuilder from "@sanity/image-url"
import { addItem } from "../state/app"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import client from "../client"

const builder = imageUrlBuilder(myConfigSanityClient)

const useStyles = makeStyles(theme => ({
  img: {
    height: "400",
    display: "block",
    // maxWidth: "100%",
    overflow: "hidden",
    width: "100%",
  },
}))

function SwipeableTextMobileStepper(props) {
  const classes = useStyles()
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const [carouselImages, setCarouselImages] = useState([])
  useEffect(() => {
    setCarouselImages(props.brands)
    setActiveStep(props.openingIndex)
  }, [])

  const maxSteps = carouselImages.length

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleStepChange = step => {
    setActiveStep(step + 1)
  }
  return (
    <div>
      <Paper square elevation={0} className={classes.header}></Paper>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {carouselImages.map((step, index) => {
          function urlFor(_ref) {
            return builder.image(_ref)
          }
          let emptyArr = []
          step.sizes.map((size, i) => {
            let newArr = size.split(",")
            newArr.map(item => {
              emptyArr.push(item.slice(0, 4))
            })
          })
          let cartItem = {
            model: step.title,
            manufacturer: step.vendorTitle,
            price: step.price,
            image: step.images,
            sizes: emptyArr,
            size: emptyArr[0],
          }
          let last2 = step.price.slice(-2)
          let priceLength = step.price.length - 2
          let firstFew = step.price.slice(0, priceLength)
          let newPrice = `${firstFew}.${last2}`
          return (
            <div
              key={step.label}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {Math.abs(activeStep - index) <= 2 ? (
                <img
                  // className={classes.img}
                  src={urlFor(step.images[0].asset._ref)
                    .width(400)
                    .url()}
                  // src={image.image}
                  // alt={image.label}
                />
              ) : null}
              <br />
              <h5 style={{ display: "flex", justifyContent: "center" }}>
                {newPrice}
              </h5>
              <Button
                onClick={() => props.addItem(cartItem)}
                style={{ backgroundColor: "green", color: "white" }}
              >
                Add to Cart
              </Button>
              <br />
            </div>
          )
        })}
      </SwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    // everything: state,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addItem: item => addItem(item),
      // swapThemeColors: (checked) => swapThemeColors(checked),
    },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwipeableTextMobileStepper)
