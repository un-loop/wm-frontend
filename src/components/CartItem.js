import React, { useState } from "react"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { chooseSize } from "../state/app"

const CartItem = props => {
  const [shoeSize, setShoeSize] = useState(0)
  // function urlFor(_ref) {
  //     return builder.image(_ref)
  //   }

  console.log("CartItem props: ", props)

  const handleChange = event => {
    setShoeSize(event.target.value)
    props.chooseSize({
      item: props.item,
      index: props.itemIndex,
      size: event.target.value,
    })
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-start",
        padding: 20,
      }}
    >
      <FormControl>
        <InputLabel id="demo-simple-select-helper-label">Size</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={props.item.size}
          onChange={handleChange}
        >
          {props.emptyArr.map((size, i) => {
            return <MenuItem value={size}>{size}</MenuItem>
          })}
        </Select>
        <FormHelperText>Select Your Shoe Size</FormHelperText>
      </FormControl>
      {/* <div style={{ display: "flex", flexDirection: "column" }}>
                <img
                src={urlFor(props.image[0].asset._ref)
                    .width(100)
                    .url()}
                />
                <button onClick={() => props.removeItem(i)}>
                Remove Item
                </button>
            </div> */}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    everything: state,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      chooseSize: item => chooseSize(item),
      // swapThemeColors: (checked) => swapThemeColors(checked),
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)
