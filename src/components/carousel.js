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

// const tutorialSteps = [
//   {
//     imgPath: "https://wm-photos.s3.amazonaws.com/blund1.jpg",
//   },
//   {
//     imgPath: "https://wm-photos.s3.amazonaws.com/herschelMix.jpg",
//   },
//   {
//     imgPath: "https://wm-photos.s3.amazonaws.com/leopard.JPG",
//   },
// ]

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    // alignItems: "stretch",
    textAlign: "center",
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 80,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: "100%",
    display: "block",
    maxWidth: "100%",
    overflow: "hidden",
    width: "100%",
  },
}))

function SwipeableTextMobileStepper() {
  const classes = useStyles()
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const [carouselImages, setCarouselImages] = useState([])

  useEffect(() => {
    onLoad()
  }, [])
  async function onLoad() {
    try {
      const carousel = await client.fetch(`
        *[_type == 'carousel']{
          slug, image}`)

      console.log("testing 123", carousel)
      setCarouselImages(carousel)
    } catch (e) {
      if (e !== "No current user") {
        alert(e)
      }
    }
    // setIsLoading(false);
  }

  const maxSteps = carouselImages.length

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleStepChange = step => {
    setActiveStep(step)
  }

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {carouselImages.map((step, index) => {
          console.log("Step:", step)
          function urlFor(_ref) {
            return builder.image(_ref)
          }
          return (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img
                  className={classes.img}
                  src={urlFor(step.image[0].asset._ref)}
                  // src={step.image}
                  // alt={step.label}
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
