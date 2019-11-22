import React from "react"
import client from "../client"
class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vendors: [],
      brand: [],
    }
  }
  async componentDidMount() {
    const result = await client.fetch(`*[_type == 'vendor' ]{	
            title, slug}`)
    console.log(result)
    const url = result.slug.current
    this.setState({ vendors: result })
  }
  render() {
    return (
      <div>
        {this.state.vendors.map((vendor, i) => {
          console.log(vendor)
          return (
            <React.Fragment>
              <h1>{vendor.title}</h1>
              <p>{vendor.distributor}</p>
            </React.Fragment>
          )
        })}
      </div>
    )
  }
}
export default Search
