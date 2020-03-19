import React, { Component } from "react"
import { Link } from "gatsby"
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
    console.log("Results: ", results)
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
      width: "100%",
    }
    const styleHeader = {
      width: "100%",
      fontSize: "110%",
      lineHeight: "1.1em",
      margin: "0.2em 0.2em",
      paddingLeft: "0.3em",
      color: "white",
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
    }

    return (
      <div className="dd-wrapper" style={styleWrapper}>
        <div
          className="dd-header"
          style={styleHeader}
          onClick={() => this.toggleList()}
        >
          <div className="dd-header-title" style={styleHeader}>
            {`${headerTitle}`}
          </div>
          {listOpen}
        </div>
        {listOpen && (
          <ul
            className="dd-list"
            style={listbox}
            onClick={e => e.stopPropagation()}
          >
            {this.state.vendors.map((vendor, idx) => (
              <React.Fragment key={idx}>
                {vendor.gender === this.props.gender ||
                vendor.gender === "Accessories" ? (
                  <Link to={`/${vendor.slug.current}`}>
                    <li
                      className="dd-list-item"
                      key={vendor.title}
                      onClick={() => {
                        this.selectItem(vendor.title, vendor.key)
                      }}
                    >
                      {vendor.title} {vendor.selected}
                    </li>
                  </Link>
                ) : null}
              </React.Fragment>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default DropdownContainer
