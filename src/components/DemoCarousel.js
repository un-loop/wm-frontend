import React, { Component } from "react"
import ReactDOM from "react-dom"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
const bg = require("../images/store-bg.jpg")
const jsMedBlkMix = require("../images/jsMedBlkMix.jpg")
const haflingerAll = require("../images/haflingerAll.jpg")
const jsTallGray = require("../images/jsTallGray.jpg")
const jaffaShBlu = require("../images/jaffaShBlu.jpg")
const josefSiebelTal = require("../images/josefSiebelTal.jpg")

class DemoCarousel extends Component {
  render() {
    return (
      <Carousel>
        <div>
          <img src={bg} alt="" />
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <img src={jsMedBlkMix} alt="" />
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <img src={haflingerAll} alt="" />
          <p className="legend">Legend 3</p>
        </div>
        <div>
          <img src={jsTallGray} alt="" />
          <p className="legend">Legend 4</p>
        </div>
        <div>
          <img src={jaffaShBlu} alt="" />
          <p className="legend">Legend 5</p>
        </div>
        <div>
          <img src={josefSiebelTal} alt="" />
          <p className="legend">Legend 6</p>
        </div>
      </Carousel>
    )
  }
}

export default DemoCarousel
