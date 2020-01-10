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
import client from "../client"

const builder = imageUrlBuilder(myConfigSanityClient)

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const useStyles = makeStyles(theme => ({
  root: {
    // padding: '0 70px',
    // box-sizing: border-box,
    // display: 'absolute',
    // width: '100%',
    // top: '50%',
    // left: '50%',
    // maxWidth: "100%",
    // flexGrow: 1,
    // display: "flex",
    // flexDirection: "column",
    // textAlign: "center",
  },
  // header: {
  //   display: "flex",
  //   alignItems: "center",
  //   height: 80,
  //   paddingLeft: theme.spacing(4),
  //   backgroundColor: theme.palette.background.default,
  // },
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
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}></Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {carouselImages.map((step, index) => {
          // console.log("Step:", step)
          // console.log('Image Index: ', index)
          function urlFor(_ref) {
            return builder.image(_ref)
          }
          return (
            <div
              key={step.label}
              style={{ display: "flex", justifyContent: "center" }}
            >
              {Math.abs(activeStep - index) <= 2 ? (
                <img
                  // className={classes.img}
                  src={urlFor(step.defaultProductVariant.images[0].asset._ref)
                    .width(400)
                    .url()}
                  // src={image.image}
                  // alt={image.label}
                />
              ) : null}
            </div>
          )
        })}
      </AutoPlaySwipeableViews>
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

export default SwipeableTextMobileStepper
