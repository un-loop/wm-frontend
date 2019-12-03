import React from "react"
import client from "../client"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { TextField } from "@material-ui/core"

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vendors: [],
      brand: [],
      title: "",
    }
  }
  async componentDidMount() {
    const result = await client.fetch(`*[_type == 'vendor' ]{	
            title, slug}`)
    console.log(result)
    // const url = result.slug.current
    this.setState({ vendors: result })
  }

  onChange = e => {
    this.setState({ title: e.target.value })
  }
  render() {
    return (
      <div>
        <Autocomplete
          id="search-box"
          options={this.state.vendors}
          getOptionLabel={option => option.title}
          style={{ width: 300 }}
          renderInput={params => (
            <TextField
              {...params}
              label="Combo box"
              variant="outlined"
              fullWidth
            />
          )}
        />
        {/* <input type="text" name="name"
            placeholder="Search"
            value={this.state.title}
            onChange={this.onChange} />
        {this.state.vendors.map((vendor, i) => {
          console.log(vendor)
          return (
              <React.Fragment>
                {vendor.title.toUpperCase().startsWith(this.state.title.toUpperCase()) ? (
                  <React.Fragment>
                    <h1>{vendor.title}</h1>
                    <p>{vendor.distributor}</p>
                  </React.Fragment>
                  ) : null
                }
            </React.Fragment>
          )
        })} */}
      </div>
    )
  }
}
export default Search
