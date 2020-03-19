import CircularProgress from "@material-ui/core/CircularProgress"
import { makeStyles } from "@material-ui/core/styles"
import React from "react"

const Progress = props => {
  const { variant, ...remainder } = props
  const classes = useStyle()

  return (
    <div
      className={
        variant && variant === "overlay"
          ? classes.containerOverlay
          : classes.containerFill
      }
    >
      <CircularProgress className={classes.progress} {...remainder} />

      {props.children}
    </div>
  )
}

const useStyle = makeStyles(theme => ({
  containerFill: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  containerOverlay: {
    left: "50%",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  progress: {
    margin: theme.spacing(2),
  },
}))

export default Progress
