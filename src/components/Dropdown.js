import React, { Component } from "react"
import { Link } from "react-dom"
import client from "../client"

class DropdownContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vendors: [],
      title: "",
      key: "title",
      gender: "",
      listOpen: false,
      headerTitle: this.props.title,
    }
    this.close = this.close.bind(this)
  }
  async componentDidMount() {
    const results = await client.fetch(`*[_type == 'vendor' ]{	
                title, gender, slug}`)
    this.setState({ vendors: results })
  }

  componentDidUpdate() {
    setTimeout(() => {
      if (this.state.listOpen) {
        window.addEventListener("click", this.close)
      } else {
        window.removeEventListener("click", this.close)
      }
    })
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.close)
  }

  close(timeout) {
    this.setState({
      listOpen: false,
    })
  }

  selectItem(title, stateKey) {
    this.setState(
      {
        headerTitle: title,
        listOpen: false,
      }
      // this.props.resetThenSet(title, stateKey)
    )
  }

  onClick = e => {
    this.setState({ title: e.target.value })
  }

  handleClickOutside() {
    this.setState({
      listOpen: false,
    })
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen,
    }))
  }

  toggleSelected = (title, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp[title].selected = !temp[title].selected
    this.setState({
      [key]: temp,
    })
  }

  resetThenSet = (title, key) => {
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp.forEach(item => (item.selected = false))
    temp[title].selected = true
    this.setState({
      [key]: temp,
    })
  }

  render() {
    const { listOpen, headerTitle } = this.state
    const styleWrapper = {
      // borderRadius: 5,
      // border: "2px solid #cccccc",
      // height: "calc(1.8em - 2px)",
      width: "100%",
    }
    const styleHeader = {
      // height: "calc(1.8em - 6px)",
      width: "100%",
      fontSize: "100%",
      lineHeight: "1.1em",
      margin: "0.2em 0.2em",
      paddingLeft: "0.3em",
    }
    const listbox = {
      backgroundImage: "none",
      lineHeight: "1.1em",
      fontSize: "100%",
      width: "8em",
      margin: 0,
      padding: 0,
      zIndex: 1,
      position: "absolute",
      listStyle: "none",
      backgroundColor: "#fff",
      overflow: "auto",
      maxHeight: 300,
      // borderRadius: 5,
      // border: "1px solid rgba(0,0,0,.25)",
      // '& li[data-focus="true"]': {
      //   backgroundColor: "#4a8df6",
      //   color: "white",
      //   cursor: "pointer",
      // },
      // "& li:active": {
      //   backgroundColor: "#2977f5",
      //   color: "white",
      // },
    }

    return (
      <div className="dd-wrapper" style={styleWrapper}>
        <div
          className="dd-header"
          style={styleHeader}
          onClick={() => this.toggleList()}
        >
          <div className="dd-header-title" style={styleHeader}>
            {headerTitle}
          </div>
          {listOpen}
        </div>
        {listOpen && (
          // <nav id="search-head">
          <ul
            className="dd-list"
            style={listbox}
            onClick={e => e.stopPropagation()}
          >
            {this.state.vendors.map(vendor => (
              <React.Fragment>
                {vendor.gender === this.props.gender ||
                vendor.gender === "both" ? (
                  // <Link to={`/${vendor.title}`}>
                  <li
                    className="dd-list-item"
                    // style={{ "&:hover": { opacity: 1 } }}
                    // style={{ fontSize: "0.8em" }}
                    key={vendor.title}
                    onClick={() => {
                      console.log("Whats good")
                      this.selectItem(vendor.title, vendor.key)
                    }}
                  >
                    {vendor.title} {vendor.selected}
                  </li>
                ) : // </Link>
                null}
              </React.Fragment>
            ))}
          </ul>
          // </nav>
        )}
      </div>
    )
  }
}

export default DropdownContainer
