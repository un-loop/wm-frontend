import React, { Component } from "react"
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
      },
      this.props.resetThenSet(title, stateKey)
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
      borderRadius: 5,
      border: "2px solid #cccccc",
      height: "calc(1.8em - 2px)",
      maxWidth: "8.9em",
    }
    const styleHeader = {
      height: "calc(1.8em - 6px)",
      maxWidth: "8.9em",
    }
    return (
      <div className="dd-wrapper" style={styleWrapper}>
        <div
          className="dd-header"
          style={styleHeader}
          onClick={() => this.toggleList()}
        >
          <div className="dd-header-title" style={{ lineHeight: "1em" }}>
            {headerTitle}
          </div>
          {listOpen}
        </div>
        {listOpen && (
          <ul
            className="dd-list"
            style={{ display: "flex", flexDirection: "column" }}
            onClick={e => e.stopPropagation()}
          >
            {this.state.vendors.map(vendor => (
              <React.Fragment>
                {vendor.gender === this.props.gender ||
                vendor.gender === "both" ? (
                  <li
                    className="dd-list-item"
                    key={vendor.title}
                    onClick={() => this.selectedItem(vendor.title, vendor.key)}
                  >
                    {vendor.title} {vendor.selected}
                  </li>
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
