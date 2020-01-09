/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react"
import useAutocomplete from "@material-ui/lab/useAutocomplete"
import { makeStyles } from "@material-ui/core/styles"
import client from "../client"

const useStyles = makeStyles(theme => ({
  label: {
    display: "block",
  },
  input: {
    maxWidth: "8.9em",
    maxHeight: 80,
    borderRadius: 5,
    height: "1.8em",
    border: "2px solid #cccccc",
  },
  listbox: {
    width: "9em",
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: "absolute",
    listStyle: "none",
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
    maxHeight: 300,
    borderRadius: 5,
    border: "1px solid rgba(0,0,0,.25)",
    '& li[data-focus="true"]': {
      backgroundColor: "#4a8df6",
      color: "white",
      cursor: "pointer",
    },
    "& li:active": {
      backgroundColor: "#2977f5",
      color: "white",
    },
  },
}))

export default function UseAutocomplete() {
  const [vendor, setVendor] = useState([])
  const classes = useStyles()

  useEffect(() => {
    onLoad()
  }, [])
  async function onLoad() {
    try {
      const vendor = await client.fetch(`
        *[_type == 'vendor']{
          slug, title }`)

      console.log("testing 123", vendor)
      setVendor(vendor)
    } catch (e) {
      if (e !== "No current user") {
        alert(e)
      }
    }
    // setIsLoading(false);
  }

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: vendor,
    getOptionLabel: option => option.title,
  })
  //   const []

  return (
    <div>
      <div {...getRootProps()}>
        {/* <label className={classes.label} {...getInputLabelProps()}>
          useAutocomplete
        </label> */}
        <input
          className={classes.input}
          {...getInputProps()}
          placeholder=" Search"
        />
      </div>
      {groupedOptions.length > 0 ? (
        <ul className={classes.listbox} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>{option.title}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
